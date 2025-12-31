// ===================================
// Blog Posts Data (loaded from JSON)
// ===================================
let blogPosts = [];

// Load blog posts from JSON file
async function loadBlogPosts() {
  try {
    const response = await fetch('/content/blog/posts.json');
    blogPosts = await response.json();
    window.blogPosts = blogPosts;
    return blogPosts;
  } catch (e) {
    console.error('Failed to load blog posts:', e);
    return [];
  }
}

// Export for other scripts
window.blogPosts = blogPosts;
window.loadBlogPosts = loadBlogPosts;

// ===================================
// App Initialization
// ===================================
document.addEventListener('DOMContentLoaded', async () => {
  await loadBlogPosts();
  initializeApp();
});

function initializeApp() {
  fetchUserIP();
  startTypewriter();
  startUptimeCounter();
  renderBlogPosts();

  // Hash handling for navigation
  handleHashNavigation();
  window.addEventListener('hashchange', handleHashNavigation);
}

// ===================================
// Core Functions
// ===================================

function fetchUserIP() {
  const el = document.getElementById('user-ip');
  if (!el) return;

  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      el.textContent = data.ip;
    })
    .catch(e => {
      console.log('IP fetch failed');
      el.textContent = 'there'; // Fallback
    });
}

function startTypewriter() {
  const roles = [
    "I'm Azan Waseem",
    "I Build Communities",
    "I Love Low-Level Code",
    "I Help Students Grow"
  ];
  
  const el = document.getElementById('typewriter-text');
  if (!el) return;
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      el.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      el.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500; // Pause before new word
    }

    setTimeout(type, typeSpeed);
  }

  setTimeout(type, 500);
}

function startUptimeCounter() {
  const el = document.getElementById('uptime');
  if (!el) return;
  
  const start = new Date();
  
  setInterval(() => {
    const now = new Date();
    const diff = Math.floor((now - start) / 1000);
    
    const h = Math.floor(diff / 3600).toString().padStart(2, '0');
    const m = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
    const s = (diff % 60).toString().padStart(2, '0');
    
    el.textContent = `${h}:${m}:${s}`;
  }, 1000);
}

function renderBlogPosts() {
  const list = document.getElementById('blog-list');
  if (!list) return;

  // Sort by date desc
  const sorted = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  list.innerHTML = sorted.map(post => `
    <a href="/blog?slug=${post.slug}" class="blog-row">
      <div class="blog-date">${formatDate(post.date)}</div>
      <div class="blog-title">${post.title}</div>
    </a>
  `).join('');
}

function formatDate(dateStr) {
  // Return YYYY-MM-DD for that nerdy feel
  const d = new Date(dateStr);
  return d.toISOString().split('T')[0];
}

function handleHashNavigation() {
  const hash = window.location.hash;
  if (hash) {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

function toggleMobileMenu() {
  const nav = document.getElementById('mobile-nav');
  if (nav) {
    nav.classList.toggle('open');
  }
}

// Make globally available
window.toggleMobileMenu = toggleMobileMenu;
window.formatDate = formatDate;
