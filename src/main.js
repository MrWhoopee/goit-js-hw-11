import * as pixabay from './js/pixabay-api.js';
import * as render from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorUrl from './img/error.svg';

const refs = {
  searchFormEl: document.querySelector('.form'),
  galleryContainer: document.querySelector('.gallery'),
  loaderEl: document.querySelector('.loader'),
};

function toastError(message) {
  iziToast.error({
    message,
    position: 'topRight',
    backgroundColor: '#ef4040',
    titleColor: '#fff',
    messageColor: '#fff',
    progressBarColor: '#b51b1b',
    iconUrl: errorUrl,
    close: true,
    class: 'my-toast',
  });
}

async function searchFormFunction(e) {
  e.preventDefault();

  const query = e.target.elements['search-text'].value.trim();
  if (!query) {
    toastError('Fill the form please');
    return;
  }

  render.clearGallery(refs.galleryContainer);
  render.showLoader(refs.loaderEl);

  try {
    const { hits } = await pixabay.getImagesByQuery(query);

    if (!hits || hits.length === 0) return;

    render.createGallery(refs.galleryContainer, hits);
  } catch (error) {
    if (error.message === 'EMPTY_QUERY') toastError('Fill the form please');
    if (error.message === 'NO_RESULTS')
      toastError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    else toastError('Failed to fetch images. Please try again later.');
  } finally {
    render.hideLoader(refs.loaderEl);
  }
}

refs.searchFormEl.addEventListener('submit', searchFormFunction);
