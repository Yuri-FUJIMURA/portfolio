/* ============================================
   main.js — index.html のロジック
   ============================================ */

// --- パスベースのルーティング ---
const pathToSection = { '/about': 'about', '/works': 'works', '/study': 'study', '/contact': 'contact' };

const initSection = pathToSection[window.location.pathname];
if (initSection) {
  document.documentElement.style.scrollBehavior = 'auto';
  window.addEventListener('load', function() {
    var el = document.getElementById(initSection);
    if (el) el.scrollIntoView();
    setTimeout(function() { document.documentElement.style.scrollBehavior = ''; }, 50);
  });
}

// --- ナビクリック SPA処理 ---
document.querySelectorAll('a.nav-logo, .nav-links a').forEach(function(link) {
  link.addEventListener('click', function(e) {
    var href = this.getAttribute('href');
    if (!href || href.startsWith('http')) return;
    e.preventDefault();
    var sectionId = href === '/' ? 'hero' : pathToSection[href];
    if (sectionId) {
      history.pushState(null, '', href);
      var el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  });
});

// --- スクロールに合わせてURLを更新 ---
var sectionUrls = { hero: '/', about: '/about', works: '/works', study: '/study', contact: '/contact' };
var urlObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      history.replaceState(null, '', sectionUrls[entry.target.id] || '/');
    }
  });
}, { threshold: 0.3 });
['hero', 'about', 'works', 'study', 'contact'].forEach(function(id) {
  var el = document.getElementById(id);
  if (el) urlObs.observe(el);
});

// --- Hero text split animation ---
var heroName = document.getElementById('heroName');
if (heroName) {
  var text = heroName.textContent;
  heroName.textContent = '';
  text.split('').forEach(function(char, i) {
    var span = document.createElement('span');
    span.className = 'char';
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.animationDelay = (0.3 + i * 0.06) + 's';
    heroName.appendChild(span);
  });
}

// --- Cursor glow ---
var glow = document.getElementById('cursorGlow');
var glowActive = false;
if (glow) {
  document.addEventListener('mousemove', function(e) {
    if (!glowActive) { glow.classList.add('active'); glowActive = true; }
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// --- Nav scroll ---
var navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  });
}

// --- Intersection Observer (fade-in animations) ---
function createObserver(selector, stagger) {
  stagger = stagger || 80;
  var obs = new IntersectionObserver(function(entries) {
    var visible = entries.filter(function(e) { return e.isIntersecting; });
    visible.forEach(function(entry, i) {
      setTimeout(function() { entry.target.classList.add('visible'); }, i * stagger);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll(selector).forEach(function(el) { obs.observe(el); });
}
createObserver('.section-label, .section-title, .section-divider');
createObserver('.about-content');
createObserver('.work-card', 120);
createObserver('.contact-content');

// --- Mobile menu ---
var hamburger = document.getElementById('hamburger');
var navLinks = document.getElementById('navLinks');
if (hamburger) {
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
}
function closeMenu() {
  if (hamburger) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  }
}

// --- JSON からカードを動的生成 ---
function renderWorkCards(data, gridSelector, detailPage) {
  var grid = document.querySelector(gridSelector);
  if (!grid) return;
  data.forEach(function(item) {
    var card = document.createElement('div');
    card.className = 'work-card';

    var linkHtml = '<a href="' + detailPage + '?id=' + item.id + '" class="work-card-link">';
    linkHtml += '<div class="work-thumbnail-wrap"><img src="' + item.image + '" alt="' + item.title + '"></div>';
    linkHtml += '<div class="work-info">';
    linkHtml += '<p class="work-category">' + item.category + '</p>';
    linkHtml += '<h3>' + item.title + '</h3>';
    linkHtml += '<p>' + item.cardDescription + '</p>';
    linkHtml += '</div></a>';

    var extLinksHtml = '';
    if (item.links && item.links.length > 0) {
      extLinksHtml = '<div class="work-card-links">';
      item.links.forEach(function(link) {
        extLinksHtml += '<a href="' + link.url + '" target="_blank" rel="noopener">' + link.label + '</a>';
      });
      extLinksHtml += '</div>';
    }

    var toolsHtml = item.tools ? '<p class="work-tools">' + item.tools + '</p>' : '';

    card.innerHTML = linkHtml + extLinksHtml + toolsHtml;
    grid.appendChild(card);
  });
  // Observer を再適用
  createObserver('.work-card', 120);
}

// --- データ読み込み・レンダリング ---
Promise.all([
  fetch('content/works.json').then(function(r) { return r.json(); }),
  fetch('content/studies.json').then(function(r) { return r.json(); })
]).then(function(results) {
  renderWorkCards(results[0], '#works .works-grid', 'works.html');
  renderWorkCards(results[1], '#study .works-grid', 'study.html');
});
