// ===================================
// Blog Post Page Logic
// ===================================

document.addEventListener('DOMContentLoaded', async () => {
  await initBlogPost();
});

async function initBlogPost() {
  // Wait for blog posts to load from main.js
  if (window.loadBlogPosts) {
    await window.loadBlogPosts();
  }
  
  loadBlogPost();
}

async function loadBlogPost() {
  // Support both /blog?slug=xxx and /blog/xxx URL formats
  const urlParams = new URLSearchParams(window.location.search);
  let slug = urlParams.get('slug');
  
  // If no query param, try to get slug from path
  if (!slug) {
    const pathMatch = window.location.pathname.match(/\/blog\/(.+)/);
    if (pathMatch) {
      slug = pathMatch[1];
    }
  }

  if (!slug) {
    showNotFound();
    return;
  }

  // Check if blogPosts is available from main.js
  if (!window.blogPosts || window.blogPosts.length === 0) {
    console.error('Blog posts data not found. Ensure main.js is loaded.');
    showNotFound();
    return;
  }

  const post = window.blogPosts.find(p => p.slug === slug);

  if (!post) {
    showNotFound();
    return;
  }

  // Try to load from cache first for instant display
  let content = null;
  if (window.getCachedBlogPostContent) {
    content = window.getCachedBlogPostContent(slug);
    if (content) {
      post.content = content;
      // Render immediately with cached content
      updateMetaTags(post);
      renderPost(post);
      updateShareButtons(post);
      
      // Hide loading and show article
      const loading = document.getElementById('loading');
      if (loading) loading.style.display = 'none';
      const notFound = document.getElementById('not-found');
      if (notFound) notFound.style.display = 'none';
      const article = document.getElementById('post-article');
      if (article) article.style.display = 'block';
    }
  }
  
  // Fetch fresh content in background (or immediately if no cache)
  try {
    const response = await fetch(`/content/blog/posts/${slug}.md`);
    if (!response.ok) throw new Error('Failed to fetch blog content');
    const freshContent = await response.text();
    
    // Only update if content changed
    if (freshContent !== content) {
      post.content = freshContent;
      
      // Update UI if we already rendered cached content
      if (content) {
        renderPost(post);
      } else {
        // First time load - render now
        updateMetaTags(post);
        renderPost(post);
        updateShareButtons(post);
        
        // Hide loading and show article
        const loading = document.getElementById('loading');
        if (loading) loading.style.display = 'none';
        const notFound = document.getElementById('not-found');
        if (notFound) notFound.style.display = 'none';
        const article = document.getElementById('post-article');
        if (article) article.style.display = 'block';
      }
    }
    
    // Cache the fresh content
    if (window.cacheBlogPostContent) {
      await window.cacheBlogPostContent(slug, freshContent);
    }
  } catch (e) {
    console.error('Failed to load blog content:', e);
    // If we have cached content, keep showing it (already displayed)
    if (!content) {
      // No cache and fetch failed - show 404
      showNotFound();
      return;
    }
    // Otherwise, cached content is already displayed, just log the error
  }

  // Note: Meta tags, rendering, and share buttons are now handled
  // inside the content loading logic above
}

function renderPost(post) {
  const titleEl = document.getElementById('post-title');
  const dateEl = document.getElementById('post-date');
  const bodyEl = document.getElementById('post-body');

  if (titleEl) titleEl.textContent = post.title;
  if (dateEl) dateEl.textContent = window.formatDate ? window.formatDate(post.date) : post.date;
  
  if (bodyEl) {
    bodyEl.innerHTML = parseMarkdown(post.content);
  }
}

function updateMetaTags(post) {
  document.title = `${post.title} | Azan Waseem`;
  
  const setMeta = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute('content', val);
  };

  setMeta('meta-title', post.title);
  setMeta('meta-description', post.excerpt);
  setMeta('og-title', post.title);
  setMeta('og-description', post.excerpt);
  setMeta('twitter-title', post.title);
  setMeta('twitter-description', post.excerpt);
  const image = post.image || 'https://azanw.com/link-preview.png';
  
  // Image tags
  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) ogImage.setAttribute('content', image);
  const twImage = document.querySelector('meta[property="twitter:image"]');
  if (twImage) twImage.setAttribute('content', image);
  
  // URL updates
  const url = window.location.href;
  setMeta('og-url', url);
  setMeta('twitter-url', url);
}

function updateShareButtons(post) {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(post.title);

  const wa = document.getElementById('share-whatsapp');
  const fb = document.getElementById('share-facebook');
  const li = document.getElementById('share-linkedin');

  if (wa) wa.href = `https://wa.me/?text=${title}%20${url}`;
  if (fb) fb.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  if (li) li.href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
}

function showNotFound() {
  const loading = document.getElementById('loading');
  if (loading) loading.style.display = 'none';
  
  const notFound = document.getElementById('not-found');
  if (notFound) notFound.style.display = 'block';
}

// Markdown Parser
function parseMarkdown(text) {
  if (!text) return '';
  
  let html = text;
  
  // Code Blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre><code class="${lang || ''}">${escapeHtml(code.trim())}</code></pre>`;
  });
  
  // Inline Code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Headers
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
  
  // Bold/Italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Blockquotes
  html = html.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>');
  
  // Lists (Basic support)
  html = html.replace(/^\- (.*$)/gm, '<ul><li>$1</li></ul>'); // This is naive, creates ul for each li
  html = html.replace(/<\/ul>\s*<ul>/g, ''); // Fix adjacent uls
  
  // Paragraphs (Split by double newline)
  // Be careful not to wrap block tags in p
  const parts = html.split(/\n\n+/);
  html = parts.map(part => {
    part = part.trim();
    if (!part) return '';
    if (part.startsWith('<h') || part.startsWith('<pre') || part.startsWith('<ul') || part.startsWith('<blockquote')) {
      return part;
    }
    return `<p>${part}</p>`;
  }).join('');
  
  return html;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
