import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import * as pixabay from './js/pixabay-api.js';
import * as render from './js/render-functions.js';

const refs = {
  searchFormEl: document.querySelector('.form'),
  galleryContainer: document.querySelector('.gallery'),
  loaderEl: document.querySelector('.loader'),
};

let lightbox = new SimpleLightbox('.gallery-item a', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

const searchFormFunction = async e => {
  e.preventDefault();
  const query = e.target.elements['search-text'].value.trim();
  if (!query) return;

  render.clearGallery(refs.galleryContainer);
  render.showLoader(refs.loaderEl);

  try {
    const images = await pixabay.getImagesByQuery(query);

    if (!images) {
      return;
    }

    render.createGallery(refs.galleryContainer, images);
    lightbox.refresh();
  } catch (error) {
    console.error('Error fetching images:', error);
  } finally {
    render.hideLoader(refs.loaderEl);
  }
};

refs.searchFormEl.addEventListener('submit', searchFormFunction);
