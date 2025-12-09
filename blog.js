// ===================================
// Blog Post Page Logic
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  loadBlogPost();
});

function loadBlogPost() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  if (!slug) {
    showNotFound();
    return;
  }

  // Check if blogPosts is available from main.js
  if (!window.blogPosts) {
    console.error('Blog posts data not found. Ensure main.js is loaded.');
    showNotFound();
    return;
  }

  const post = window.blogPosts.find(p => p.slug === slug);

  if (!post) {
    showNotFound();
    return;
  }

  // Update Metadata
  updateMetaTags(post);
  
  // Render Content
  renderPost(post);
  
  // Update Share Links
  updateShareButtons(post);

  // Hide loading and 404, show article
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
