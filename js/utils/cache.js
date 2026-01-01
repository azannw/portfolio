// ===================================
// Caching Utility for Blog Posts
// ===================================

const CACHE_VERSION = '1.0';
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
const POSTS_JSON_KEY = 'blog_posts_json';
const POST_CONTENT_PREFIX = 'blog_post_';

// Cache blog posts list (posts.json)
async function cacheBlogPostsList(data) {
  try {
    const cacheData = {
      data: data,
      timestamp: Date.now(),
      version: CACHE_VERSION
    };
    localStorage.setItem(POSTS_JSON_KEY, JSON.stringify(cacheData));
  } catch (e) {
    console.warn('Failed to cache blog posts list:', e);
  }
}

// Get cached blog posts list
function getCachedBlogPostsList() {
  try {
    const cached = localStorage.getItem(POSTS_JSON_KEY);
    if (!cached) return null;
    
    const cacheData = JSON.parse(cached);
    const age = Date.now() - cacheData.timestamp;
    
    // Check if cache is expired
    if (age > CACHE_EXPIRY) {
      localStorage.removeItem(POSTS_JSON_KEY);
      return null;
    }
    
    // Check version
    if (cacheData.version !== CACHE_VERSION) {
      localStorage.removeItem(POSTS_JSON_KEY);
      return null;
    }
    
    return cacheData.data;
  } catch (e) {
    console.warn('Failed to read cached blog posts list:', e);
    return null;
  }
}

// Cache individual blog post content
async function cacheBlogPostContent(slug, content) {
  try {
    const cacheData = {
      content: content,
      timestamp: Date.now(),
      version: CACHE_VERSION
    };
    localStorage.setItem(`${POST_CONTENT_PREFIX}${slug}`, JSON.stringify(cacheData));
  } catch (e) {
    // Handle quota exceeded error gracefully
    if (e.name === 'QuotaExceededError') {
      console.warn('Storage quota exceeded, clearing old cache entries');
      clearOldCacheEntries();
      // Try again after clearing
      try {
        localStorage.setItem(`${POST_CONTENT_PREFIX}${slug}`, JSON.stringify(cacheData));
      } catch (e2) {
        console.warn('Failed to cache after clearing:', e2);
      }
    } else {
      console.warn('Failed to cache blog post content:', e);
    }
  }
}

// Get cached blog post content
function getCachedBlogPostContent(slug) {
  try {
    const cached = localStorage.getItem(`${POST_CONTENT_PREFIX}${slug}`);
    if (!cached) return null;
    
    const cacheData = JSON.parse(cached);
    const age = Date.now() - cacheData.timestamp;
    
    // Check if cache is expired
    if (age > CACHE_EXPIRY) {
      localStorage.removeItem(`${POST_CONTENT_PREFIX}${slug}`);
      return null;
    }
    
    // Check version
    if (cacheData.version !== CACHE_VERSION) {
      localStorage.removeItem(`${POST_CONTENT_PREFIX}${slug}`);
      return null;
    }
    
    return cacheData.content;
  } catch (e) {
    console.warn('Failed to read cached blog post content:', e);
    return null;
  }
}

// Clear old cache entries to free up space
function clearOldCacheEntries() {
  try {
    const keys = Object.keys(localStorage);
    const now = Date.now();
    let cleared = 0;
    
    keys.forEach(key => {
      if (key.startsWith(POST_CONTENT_PREFIX) || key === POSTS_JSON_KEY) {
        try {
          const cached = JSON.parse(localStorage.getItem(key));
          if (cached && (now - cached.timestamp > CACHE_EXPIRY)) {
            localStorage.removeItem(key);
            cleared++;
          }
        } catch (e) {
          // Invalid cache entry, remove it
          localStorage.removeItem(key);
          cleared++;
        }
      }
    });
    
    if (cleared > 0) {
      console.log(`Cleared ${cleared} old cache entries`);
    }
  } catch (e) {
    console.warn('Failed to clear old cache entries:', e);
  }
}

// Preload blog post content (for hover preloading)
async function preloadBlogPost(slug) {
  // Check if already cached
  if (getCachedBlogPostContent(slug)) {
    return; // Already cached, no need to preload
  }
  
  // Preload in background
  try {
    const response = await fetch(`/content/blog/posts/${slug}.md`);
    if (response.ok) {
      const content = await response.text();
      await cacheBlogPostContent(slug, content);
    }
  } catch (e) {
    // Silently fail for preloads
    console.debug('Preload failed for:', slug);
  }
}

// Clean up old cache entries on load (run once per session)
let cleanupRun = false;
if (!cleanupRun && typeof window !== 'undefined') {
  cleanupRun = true;
  // Run cleanup after a short delay to not block page load
  setTimeout(() => {
    clearOldCacheEntries();
  }, 1000);
}

// Make functions globally available
window.cacheBlogPostsList = cacheBlogPostsList;
window.getCachedBlogPostsList = getCachedBlogPostsList;
window.cacheBlogPostContent = cacheBlogPostContent;
window.getCachedBlogPostContent = getCachedBlogPostContent;
window.preloadBlogPost = preloadBlogPost;
window.clearOldCacheEntries = clearOldCacheEntries;

