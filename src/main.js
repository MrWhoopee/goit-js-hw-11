import * as pixabay from './js/pixabay-api.js';
import * as render from './js/render-functions.js';

const refs = {
  searchFormEl: document.querySelector('.form'),
  galleryContainer: document.querySelector('.gallery'),
  loaderEl: document.querySelector('.loader'),
};

const searchFormFunction = async e => {
  e.preventDefault();
  const query = e.target.elements['search-text'].value.trim();
  if (!query) return;

  render.clearGallery(refs.galleryContainer);
  render.showLoader(refs.loaderEl);

  try {
    const images = await pixabay.getImagesByQuery(query);

    if (!images || images.length === 0) {
      return;
    }

    render.createGallery(refs.galleryContainer, images);
  } catch (error) {
    // Помилка вже оброблена в pixabay-api.js через iziToast
  } finally {
    render.hideLoader(refs.loaderEl);
  }
};

refs.searchFormEl.addEventListener('submit', searchFormFunction);
