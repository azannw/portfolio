// ===================================
// Blog Post Page JavaScript
// ===================================

// State
let isMenuOpen = false;

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
  loadBlogPost();
});

// ===================================
// Blog Post Loading
// ===================================
function loadBlogPost() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  if (!slug) {
    showNotFound();
    return;
  }

  // Find the post from blogPosts array (defined in main.js)
  const post = window.blogPosts.find(p => p.slug === slug);

  if (!post) {
    showNotFound();
    return;
  }

  // Update page meta tags
  updateMetaTags(post);

  // Render the post
  renderPost(post);

  // Update share buttons
  updateShareButtons(post);

  // Show the article
  document.getElementById('loading').style.display = 'none';
  document.getElementById('post-article').style.display = 'block';
}

function renderPost(post) {
  document.getElementById('post-title').textContent = post.title;
  document.getElementById('post-date').textContent = 'Published on ' + window.formatDateLong(post.date);

  // Parse and render markdown content
  const contentHtml = parseMarkdownAdvanced(post.content);
  document.getElementById('post-content').innerHTML = contentHtml;
}

function updateMetaTags(post) {
  const baseUrl = window.location.origin;
  const postUrl = `${baseUrl}/blog.html?slug=${post.slug}`;

  // Update title
  document.title = `${post.title} - Azan Waseem`;
  document.getElementById('page-title').textContent = `${post.title} - Azan Waseem`;

  // Update meta tags
  updateMetaContent('meta-title', post.title);
  updateMetaContent('meta-description', post.excerpt);
  updateMetaContent('og-title', post.title);
  updateMetaContent('og-description', post.excerpt);
  updateMetaContent('twitter-title', post.title);
  updateMetaContent('twitter-description', post.excerpt);

  // Update URLs
  document.getElementById('canonical-url')?.setAttribute('href', postUrl);
  document.getElementById('og-url')?.setAttribute('content', postUrl);
  document.getElementById('twitter-url')?.setAttribute('content', postUrl);
}

function updateMetaContent(id, content) {
  const element = document.getElementById(id);
  if (element) {
    element.setAttribute('content', content);
  }
}

function updateShareButtons(post) {
  const baseUrl = window.location.origin;
  const postUrl = `${baseUrl}/blog.html?slug=${post.slug}`;
  const encodedTitle = encodeURIComponent(post.title);
  const encodedUrl = encodeURIComponent(postUrl);

  document.getElementById('share-whatsapp').href = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
  document.getElementById('share-facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  document.getElementById('share-linkedin').href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
}

function showNotFound() {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('not-found').style.display = 'block';
}

// ===================================
// Advanced Markdown Parser
// ===================================
function parseMarkdownAdvanced(markdown) {
  let html = markdown;

  // Escape HTML entities first (except for markdown syntax)
  // html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Code blocks (must be done first to preserve content)
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/gim, function(match, lang, code) {
    return '<pre><code class="' + (lang || '') + '">' + escapeHtml(code.trim()) + '</code></pre>';
  });

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

  // Italic (but not inside URLs)
  html = html.replace(/(?<!\w)\*([^*\n]+)\*(?!\w)/gim, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Blockquotes (handle multi-line)
  html = html.replace(/^> (.*$)/gim, '<blockquote><p>$1</p></blockquote>');

  // Inline code (after code blocks to avoid conflicts)
  html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');

  // Process paragraphs and lists
  html = processBlocks(html);

  return html;
}

function processBlocks(html) {
  const lines = html.split('\n');
  const result = [];
  let inList = false;
  let listType = null;
  let paragraphBuffer = [];

  function flushParagraph() {
    if (paragraphBuffer.length > 0) {
      const content = paragraphBuffer.join(' ').trim();
      if (content && !content.startsWith('<h') && !content.startsWith('<blockquote') && !content.startsWith('<pre')) {
        result.push('<p>' + content + '</p>');
      } else if (content) {
        result.push(content);
      }
      paragraphBuffer = [];
    }
  }

  function flushList() {
    if (inList) {
      result.push(listType === 'ul' ? '</ul>' : '</ol>');
      inList = false;
      listType = null;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Skip empty lines
    if (line.trim() === '') {
      flushParagraph();
      flushList();
      continue;
    }

    // Check for unordered list items
    const ulMatch = line.match(/^- (.*)$/);
    if (ulMatch) {
      flushParagraph();
      if (!inList || listType !== 'ul') {
        flushList();
        result.push('<ul>');
        inList = true;
        listType = 'ul';
      }
      result.push('<li>' + ulMatch[1] + '</li>');
      continue;
    }

    // Check for ordered list items
    const olMatch = line.match(/^\d+\. (.*)$/);
    if (olMatch) {
      flushParagraph();
      if (!inList || listType !== 'ol') {
        flushList();
        result.push('<ol>');
        inList = true;
        listType = 'ol';
      }
      result.push('<li>' + olMatch[1] + '</li>');
      continue;
    }

    // Check for block elements
    if (line.startsWith('<h') || line.startsWith('<blockquote') || line.startsWith('<pre')) {
      flushParagraph();
      flushList();
      result.push(line);
      continue;
    }

    // Regular text - add to paragraph buffer
    flushList();
    paragraphBuffer.push(line);
  }

  // Flush remaining content
  flushParagraph();
  flushList();

  return result.join('\n');
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ===================================
// Navigation Functions
// ===================================
function goBackToPosts() {
  window.location.href = 'index.html#blog';
}

function goToHomepage() {
  window.location.href = 'index.html';
}

function goToSection(sectionId) {
  window.location.href = 'index.html#' + sectionId;
}

function toggleMobileMenu() {
  isMenuOpen = !isMenuOpen;
  const mobileNav = document.getElementById('mobile-nav');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (isMenuOpen) {
    mobileNav.classList.add('show');
    mobileNav.classList.remove('hidden');
    menuIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
  } else {
    mobileNav.classList.remove('show');
    mobileNav.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  }
}

// Make functions globally available
window.goBackToPosts = goBackToPosts;
window.goToHomepage = goToHomepage;
window.goToSection = goToSection;
window.toggleMobileMenu = toggleMobileMenu;
