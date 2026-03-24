/* ============================================
   study.js — study.html の詳細ページ表示ロジック
   ============================================ */

function getStudyId() {
  var params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id'), 10) || 0;
}

fetch('content/studies.json')
  .then(function(r) { return r.json(); })
  .then(function(studies) {
    var id = getStudyId();
    var study = studies[id];
    if (!study) { window.location.href = '/study'; return; }

    document.title = study.title + ' — Yuri FUJIMURA';

    var html = '';

    // Hero image
    html += '<div class="detail-hero-image">';
    html += '<img src="' + study.image + '" alt="' + study.title + '">';
    html += '</div>';

    // Category, Title, Venue
    html += '<p class="detail-category">' + study.category + '</p>';
    html += '<h1 class="detail-title">' + study.title + '</h1>';
    html += '<p class="detail-venue">' + study.venue + '</p>';
    html += '<div class="detail-divider"></div>';

    // Description
    if (study.detailDescription) {
      html += '<div class="detail-description"><p>' + study.detailDescription + '</p></div>';
    }

    // Links
    if (study.links.length > 0) {
      html += '<div class="detail-links">';
      study.links.forEach(function(link) {
        html += '<a href="' + link.url + '" target="_blank" rel="noopener">' + link.label + '</a>';
      });
      html += '</div>';
    }

    // Gallery
    if (study.images.length > 0) {
      html += '<div class="detail-gallery">';
      study.images.forEach(function(img) {
        html += '<div class="detail-gallery-item">';
        html += '<div class="gallery-image">';
        if (img.src) {
          html += '<img src="' + img.src + '" alt="' + (img.caption || '') + '">';
        } else {
          html += img.caption || 'Image';
        }
        html += '</div>';
        if (img.caption) html += '<p class="gallery-caption">' + img.caption + '</p>';
        html += '</div>';
      });
      html += '</div>';
    }

    // Sections
    if (study.sections.length > 0) {
      study.sections.forEach(function(sec) {
        html += '<div class="detail-section">';
        if (sec.heading) html += '<h3>' + sec.heading + '</h3>';
        if (sec.text) html += '<p>' + sec.text + '</p>';
        html += '</div>';
      });
    }

    // Prev / Next
    var prevId = id > 0 ? id - 1 : studies.length - 1;
    var nextId = id < studies.length - 1 ? id + 1 : 0;
    html += '<div class="work-nav">';
    html += '<div class="work-nav-item prev"><a href="study.html?id=' + prevId + '">';
    html += '<p class="work-nav-label">\u2190 Prev</p>';
    html += '<p class="work-nav-title">' + studies[prevId].title + '</p>';
    html += '</a></div>';
    html += '<div class="work-nav-item next"><a href="study.html?id=' + nextId + '">';
    html += '<p class="work-nav-label">Next \u2192</p>';
    html += '<p class="work-nav-title">' + studies[nextId].title + '</p>';
    html += '</a></div>';
    html += '</div>';

    // Back
    html += '<div class="back-to-works"><a href="/study">\u2190 Back to All Studies</a></div>';

    document.getElementById('detailContainer').innerHTML = html;
  });
