/* ============================================
   works.js — works.html の詳細ページ表示ロジック
   ============================================ */

function getWorkId() {
  var params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id'), 10) || 0;
}

fetch('content/works.json')
  .then(function(r) { return r.json(); })
  .then(function(works) {
    var id = getWorkId();
    var work = works[id];
    if (!work) { window.location.href = '/works'; return; }

    document.title = work.title + ' — Yuri FUJIMURA';

    var html = '';

    // Hero image
    html += '<div class="detail-hero-image">';
    html += '<img src="' + work.image + '" alt="' + work.title + '">';
    html += '</div>';

    // Category & Title
    html += '<p class="detail-category">' + work.category + '</p>';
    html += '<h1 class="detail-title">' + work.title + '</h1>';
    html += '<p class="detail-tools">' + work.tools + '</p>';
    html += '<div class="detail-divider"></div>';

    // Description
    html += '<div class="detail-description"><p>' + work.detailDescription + '</p></div>';

    // Links
    if (work.links.length > 0) {
      html += '<div class="detail-links">';
      work.links.forEach(function(link) {
        html += '<a href="' + link.url + '" target="_blank" rel="noopener">' + link.label + '</a>';
      });
      html += '</div>';
    }

    // Gallery
    if (work.images.length > 0) {
      html += '<div class="detail-gallery">';
      work.images.forEach(function(img) {
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
    if (work.sections.length > 0) {
      work.sections.forEach(function(sec) {
        html += '<div class="detail-section">';
        if (sec.heading) html += '<h3>' + sec.heading + '</h3>';
        if (sec.text) html += '<p>' + sec.text + '</p>';
        html += '</div>';
      });
    }

    // Prev / Next
    var prevId = id > 0 ? id - 1 : works.length - 1;
    var nextId = id < works.length - 1 ? id + 1 : 0;
    html += '<div class="work-nav">';
    html += '<div class="work-nav-item prev"><a href="works.html?id=' + prevId + '">';
    html += '<p class="work-nav-label">\u2190 Prev</p>';
    html += '<p class="work-nav-title">' + works[prevId].title + '</p>';
    html += '</a></div>';
    html += '<div class="work-nav-item next"><a href="works.html?id=' + nextId + '">';
    html += '<p class="work-nav-label">Next \u2192</p>';
    html += '<p class="work-nav-title">' + works[nextId].title + '</p>';
    html += '</a></div>';
    html += '</div>';

    // Back
    html += '<div class="back-to-works"><a href="/works">\u2190 Back to All Works</a></div>';

    document.getElementById('detailContainer').innerHTML = html;
  });
