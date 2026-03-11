// ===================================
// Blog Page Logic
// Handles both listing and individual post views
// ===================================

document.addEventListener('DOMContentLoaded', async () => {
  if (window.loadBlogPosts) {
    await window.loadBlogPosts();
  }

  const slug = getSlugFromURL();
  if (slug) {
    showPostView(slug);
  } else {
    renderBlogListing();
  }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
  const slug = getSlugFromURL();
  if (slug) {
    showPostView(slug);
  } else {
    showListingView();
  }
});

function showPostView(slug) {
  document.getElementById('blog-listing').style.display = 'none';
  document.getElementById('blog-post-wrapper').style.display = 'block';
  // Reset post view state
  const loading = document.getElementById('loading');
  if (loading) loading.style.display = 'block';
  const article = document.getElementById('post-article');
  if (article) article.style.display = 'none';
  const notFound = document.getElementById('not-found');
  if (notFound) notFound.style.display = 'none';
  loadBlogPost(slug);
}

function showListingView() {
  document.getElementById('blog-listing').style.display = 'block';
  document.getElementById('blog-post-wrapper').style.display = 'none';
}

// SPA back navigation
document.addEventListener('DOMContentLoaded', () => {
  const backLink = document.getElementById('back-to-blog');
  if (backLink) {
    backLink.addEventListener('click', (e) => {
      e.preventDefault();
      history.pushState({}, '', '/blog');
      showListingView();
    });
  }
});

// ===================================
// URL Helpers
// ===================================

function getSlugFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  let slug = urlParams.get('slug');

  if (!slug) {
    const pathMatch = window.location.pathname.match(/\/blog\/(.+)/);
    if (pathMatch) slug = pathMatch[1];
  }

  return slug;
}

// ===================================
// Blog Listing
// ===================================

function renderBlogListing() {
  const list = document.getElementById('blog-list');
  if (!list) return;

  if (!window.blogPosts || window.blogPosts.length === 0) {
    list.innerHTML = '<p class="text-secondary">No posts yet.</p>';
    return;
  }

  const sorted = [...window.blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  list.innerHTML = sorted.map(post => `
    <a href="/blog/${post.slug}" class="blog-row" data-slug="${post.slug}">
      <div class="blog-date">${window.formatDate ? window.formatDate(post.date) : post.date}</div>
      <div class="blog-title">${post.title}</div>
    </a>
  `).join('');

  // SPA navigation — works on any static server without rewrites
  list.querySelectorAll('.blog-row').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const slug = link.dataset.slug;
      history.pushState({ slug }, '', `/blog/${slug}`);
      showPostView(slug);
    });
  });
}

// ===================================
// Individual Blog Post
// ===================================

async function loadBlogPost(slug) {
  if (!window.blogPosts || window.blogPosts.length === 0) {
    showNotFound();
    return;
  }

  const post = window.blogPosts.find(p => p.slug === slug);

  if (!post) {
    showNotFound();
    return;
  }

  try {
    const response = await fetch(`content/blog/posts/${slug}.md`);
    if (!response.ok) throw new Error('Failed to fetch blog content');
    post.content = await response.text();
  } catch (e) {
    // Fetch failed (likely file:// protocol) — show excerpt as fallback
    post.content = `${post.excerpt}\n\n*Full post available at [azanw.com/blog/${slug}](https://www.azanw.com/blog/${slug})*`;
  }

  updateMetaTags(post);
  renderPost(post);
  updateShareButtons(post);

  const loading = document.getElementById('loading');
  if (loading) loading.style.display = 'none';

  const notFound = document.getElementById('not-found');
  if (notFound) notFound.style.display = 'none';

  const article = document.getElementById('post-article');
  if (article) article.style.display = 'block';
}

function renderPost(post) {
  const titleEl = document.getElementById('post-title');
  const dateEl = document.getElementById('post-date');
  const bodyEl = document.getElementById('post-body');

  if (titleEl) titleEl.textContent = post.title;
  if (dateEl) {
    const slug = post.slug || 'post';
    dateEl.innerHTML = `<span class="bash-cmd" style="margin-bottom: 0;">$ cat ${slug}.md</span> <span>${window.formatDate ? window.formatDate(post.date) : post.date}</span>`;
  }

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
  const image = post.image || 'https://www.azanw.com/link-preview.png';

  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) ogImage.setAttribute('content', image);
  const twImage = document.querySelector('meta[property="twitter:image"]');
  if (twImage) twImage.setAttribute('content', image);

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
  const cp = document.getElementById('share-copy');

  if (wa) wa.href = `https://wa.me/?text=${title}%20${url}`;
  if (fb) fb.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  if (li) li.href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  if (cp) {
    cp.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(window.location.href).then(() => {
        cp.style.color = 'var(--accent-color)';
        setTimeout(() => cp.style.color = '', 1500);
      });
    });
  }
}

function showNotFound() {
  const loading = document.getElementById('loading');
  if (loading) loading.style.display = 'none';

  const notFound = document.getElementById('not-found');
  if (notFound) notFound.style.display = 'block';
}

// ===================================
// Markdown Parser
// ===================================

function parseMarkdown(text) {
  if (!text) return '';
  let html = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Code Blocks
  html = html.replace(/```(\w+)?\r?\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre><code class="language-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>`;
  });

  // Inline Code
  html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>');

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Bold then Italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*\n]+?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
  html = html.replace(/<\/blockquote>\s*<blockquote>/g, '\n');

  // Unordered lists
  html = html.replace(/^[\-\*] (.+)$/gm, '<ul><li>$1</li></ul>');
  html = html.replace(/<\/ul>\s*<ul>/g, '');

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<ol><li>$1</li></ol>');
  html = html.replace(/<\/ol>\s*<ol>/g, '');

  // Paragraphs
  const blockStarts = /^<(?:h[1-6]|pre|ul|ol|blockquote|code)/;
  const parts = html.split(/\n\n+/);
  html = parts.map(part => {
    part = part.trim();
    if (!part) return '';
    if (blockStarts.test(part)) return part;
    return `<p>${part}</p>`;
  }).join('\n');

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
