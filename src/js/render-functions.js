import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = null;

function initLightbox() {
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery-item a', {
      captions: true,
      captionsData: 'alt',
      captionPosition: 'bottom',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}

function destroyLightbox() {
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
}

export function createGallery(container, images) {
  if (!Array.isArray(images)) return;

  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="gallery-item">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="gallery-info">
            <p><b>Likes:</b> ${likes}</p>
            <p><b>Views:</b> ${views}</p>
            <p><b>Comments:</b> ${comments}</p>
            <p><b>Downloads:</b> ${downloads}</p>
          </div>
        </li>
      `
    )
    .join('');

  container.insertAdjacentHTML('beforeend', markup);

  initLightbox();
}

export function clearGallery(container) {
  destroyLightbox();
  container.innerHTML = '';
}

export function showLoader(loader) {
  loader.classList.remove('visually-hidden');
}

export function hideLoader(loader) {
  loader.classList.add('visually-hidden');
}
