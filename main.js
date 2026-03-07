// ===================================
// Blog Posts Data (loaded from JSON)
// ===================================
let blogPosts = [];

const BLOG_POSTS_FALLBACK = [
  {"id":"5","title":"The Career Dilemma in Pakistan: Why We Follow Dreams That Are Not Ours","date":"2025-12-31","slug":"career-dilemma-pakistan","excerpt":"In Pakistan, children rarely get to choose their own career path. Society decides for them. But real success comes from following what truly makes you feel alive."},
  {"id":"4","title":"Complete Guide to Setting up SFML 3 in Visual Studio Community Insiders on Windows","date":"2025-12-09","slug":"sfml-3-setup-visual-studio-insiders-windows","excerpt":"A step-by-step setup that actually works for SFML 3 with Visual Studio Community Insiders on Windows.","image":"https://www.azanw.com/sfml-vs-preview.png"},
  {"id":"3","title":"Why and How to Learn Tech as a Medical Student","date":"2025-01-16","slug":"why-how-learn-tech-medical-student","excerpt":"Want to stand out from thousands of other medical students? Discover how learning tech can give you multiple career pathways."},
  {"id":"1","title":"Why is FAST so famous for its CS?","date":"2025-05-22","slug":"fast-cs-why-famous","excerpt":"I first heard about FAST when I was in my second year of college. It was my biology teacher who mentioned it casually in class."},
  {"id":"2","title":"Transitioning from Pre-Medical to FAST","date":"2025-05-01","slug":"pre-med-to-fast-transition","excerpt":"How a Pre-Med Student Can Get Into FAST for Computing Programs?"}
];

async function loadBlogPosts() {
  try {
    const response = await fetch('content/blog/posts.json');
    if (!response.ok) throw new Error('fetch failed');
    blogPosts = await response.json();
  } catch (e) {
    blogPosts = BLOG_POSTS_FALLBACK;
  }
  window.blogPosts = blogPosts;
  return blogPosts;
}

window.blogPosts = blogPosts;
window.loadBlogPosts = loadBlogPosts;

// ===================================
// App Initialization
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  fetchUserIP();
  handleHashNavigation();
  window.addEventListener('hashchange', handleHashNavigation);

  initPreloader((preloaderWasShown) => {
    initSectionReveals();
    if (preloaderWasShown) {
      // Wait for preloader slide-up to finish before typing
      setTimeout(startTypewriter, 800);
    }
  });
}

// ===================================
// Core Functions
// ===================================

function fetchUserIP() {
  const el = document.getElementById('user-ip');
  if (!el) return;

  const apis = [
    { url: 'https://api.ipify.org?format=json', getIP: data => data.ip },
    { url: 'https://ipapi.co/json/', getIP: data => data.ip },
    { url: 'https://api.ip.sb/geoip', getIP: data => data.ip }
  ];

  async function tryAPIs() {
    for (const api of apis) {
      try {
        const response = await fetch(api.url);
        const data = await response.json();
        const ip = api.getIP(data);
        if (ip) {
          el.textContent = ip;
          return;
        }
      } catch (e) {
        continue;
      }
    }
    el.textContent = 'guest';
  }

  tryAPIs();
}

function startTypewriter() {
  const phrases = ["welcome :)", "i'm azan waseem"];
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  el.textContent = '';
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function tick() {
    const current = phrases[phraseIdx];

    if (!deleting) {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        if (phraseIdx === phrases.length - 1) return;
        setTimeout(() => { deleting = true; tick(); }, 1500);
        return;
      }
      setTimeout(tick, 70);
    } else {
      el.textContent = current.substring(0, charIdx);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx++;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 40);
    }
  }

  setTimeout(tick, 200);
}


function formatDate(dateStr) {
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

// ===================================
// Theme Toggle
// ===================================
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

window.toggleMobileMenu = toggleMobileMenu;
window.formatDate = formatDate;
window.toggleTheme = toggleTheme;

// ===================================
// Preloader (slide-up style)
// ===================================
const PRELOADER_SEEN_KEY = 'preloaderSeen';

function initPreloader(onComplete) {
  const preloader = document.getElementById('preloader');
  const fill = document.querySelector('.loading-bar');

  if (!preloader) {
    document.body.classList.remove('loading');
    if (onComplete) onComplete(false);
    return;
  }

  const nav = performance.getEntriesByType?.('navigation')[0];
  const legacyType = performance.navigation?.type;
  const navType = nav?.type ?? (legacyType === 2 ? 'back_forward' : legacyType === 1 ? 'reload' : 'navigate');

  // Skip preloader: back/forward or already seen this session
  if (navType === 'back_forward' || (navType === 'navigate' && sessionStorage.getItem(PRELOADER_SEEN_KEY))) {
    preloader.remove();
    document.body.classList.remove('loading');
    if (onComplete) onComplete(false);
    return;
  }

  // Clear hero text behind preloader so typewriter can type it fresh
  const heroText = document.getElementById('typewriter-text');
  if (heroText) heroText.textContent = '';

  // Fill bar on window load, then slide preloader up
  window.addEventListener('load', () => {
    if (fill) fill.style.width = '100%';

    setTimeout(() => {
      preloader.classList.add('loaded');
      document.body.classList.remove('loading');
      sessionStorage.setItem(PRELOADER_SEEN_KEY, '1');

      // Fire callback as slide begins (content is being revealed)
      if (onComplete) onComplete(true);

      // Remove from DOM after slide animation completes
      setTimeout(() => preloader.remove(), 800);
    }, 600);
  });
}

// ===================================
// Section Reveal on Scroll
// ===================================
function initSectionReveals() {
  const sections = document.querySelectorAll('section:not(.hero)');
  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.classList.add('section-reveal');
    observer.observe(section);
  });
}
