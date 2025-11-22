import axios from 'axios';

const API_KEY = '53315678-7a3c0068dfc1cc7897b28f029';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
  if (!query || typeof query !== 'string' || query.trim() === '') {
    const err = new Error('EMPTY_QUERY');
    err.code = 'EMPTY_QUERY';
    throw err;
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: PER_PAGE,
      },
    });

    const { hits, totalHits } = response.data;

    if (!Array.isArray(hits) || hits.length === 0) {
      const err = new Error('NO_RESULTS');
      err.code = 'NO_RESULTS';
      err.totalHits = totalHits ?? 0;
      throw err;
    }

    return { hits, totalHits };
  } catch (error) {
    // якщо це вже наші помилки — перекидаємо далі,
    // інакше пакуємо як NETWORK_ERROR
    if (error.code === 'EMPTY_QUERY' || error.code === 'NO_RESULTS') {
      throw error;
    }
    const err = new Error('NETWORK_ERROR');
    err.code = 'NETWORK_ERROR';
    err.original = error;
    throw err;
  }
}
