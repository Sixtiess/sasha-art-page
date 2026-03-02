const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const hasArtworkData = Array.isArray(window.ARTWORKS);
const galleryGrid = document.querySelector('#gallery-grid');

if (hasArtworkData && galleryGrid) {
  galleryGrid.innerHTML = window.ARTWORKS.map(
    (artwork) => `
      <article class="card gallery-item" data-type="${artwork.category}">
        <a class="card-link" href="artwork.html?id=${artwork.id}">
          <img src="${artwork.image}" alt="Gray placeholder for ${artwork.title}" />
          <div class="card-body"><h3>${artwork.title}</h3><p>Open notes →</p></div>
        </a>
      </article>
    `
  ).join('');
}

const filters = document.querySelectorAll('.filter');
filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    filters.forEach((button) => button.classList.remove('active'));
    filter.classList.add('active');

    const selected = filter.dataset.filter;
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item) => {
      const show = selected === 'all' || item.dataset.type === selected;
      item.classList.toggle('hidden', !show);
    });
  });
});

const artworkPage = document.querySelector('#artwork-page');
if (hasArtworkData && artworkPage) {
  const params = new URLSearchParams(window.location.search);
  const artworkId = params.get('id');
  const artwork = window.ARTWORKS.find((item) => item.id === artworkId) || window.ARTWORKS[0];

  document.title = `${artwork.title} | Earth & Echoes`;
  document.querySelector('#artwork-title').textContent = artwork.title;
  document.querySelector('#artwork-image').src = artwork.image;
  document.querySelector('#artwork-image').alt = `Gray placeholder for ${artwork.title}`;
  document.querySelector('#artwork-medium').textContent = artwork.medium;
  document.querySelector('#artwork-size').textContent = artwork.size;
  document.querySelector('#artwork-year').textContent = artwork.year;
  document.querySelector('#artwork-stage').textContent = artwork.stage;
  document.querySelector('#artwork-story').textContent = artwork.story;
}

const filters = document.querySelectorAll('.filter');
const galleryItems = document.querySelectorAll('.gallery-item');

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    filters.forEach((button) => button.classList.remove('active'));
    filter.classList.add('active');

    const selected = filter.dataset.filter;
    galleryItems.forEach((item) => {
      const show = selected === 'all' || item.dataset.type === selected;
      item.classList.toggle('hidden', !show);
    });
  });
});
