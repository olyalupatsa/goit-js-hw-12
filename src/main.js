import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const formSearch = document.querySelector('.form');
const imageList = document.querySelector('.gallery');
const preload = document.querySelector('.preload');
const loadMoreBtn = document.querySelector('.load-more-btn');

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let currentPage = 1;

formSearch.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', loadMoreImages);

async function handleSearch(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.input.value;

  imageList.innerHTML = '';

  if (!searchQuery.trim()) {
    iziToast.show({
      title: '❕',
      theme: 'light',
      message: `Please, fill in the search field`,
      messageSize: '20px',
      messageColor: '#808080',
      backgroundColor: '#e7fc44',
      position: 'topLeft',
      timeout: 3000,
    });
    return;
  }

  preload.classList.remove('is-hidden');
  loadMoreBtn.classList.add('is-hidden');

  try {
    const data = await fetchImages(searchQuery);

    if (data.hits.length === 0) {
      iziToast.show({
        iconUrl: icon,
        theme: 'dark',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        messageSize: '16px',
        messageColor: 'white',
        backgroundColor: '#EF4040',
        position: 'topRight',
        timeout: 5000,
      });
    } else {
      imageList.innerHTML = createMarkup(data.hits);
      gallery.refresh();
      loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    handleError(error);
  } finally {
    preload.classList.add('is-hidden');
  }

  event.currentTarget.reset();
}

async function fetchImages(value, page = 1) {
  const BASE_URL = 'https://pixabay.com/api';
  const apiKey = '41989541-8f5a4609d6994378f5ee88908';

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: apiKey,
        q: value,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page,
        per_page: 40,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
           <img
            class="gallery-image"
            src="${webformatURL}"
            alt="${tags}"
          />
        </a>
        <div class="container-additional-info">
          <div class="container-descr-inner"><p class="description">Likes</p><span class="description-value">${likes}</span></div>
          <div class="container-descr-inner"><p class="description">Views</p><span class="description-value">${views}</span></div>
          <div class="container-descr-inner"><p class="description">Comments</p><span class="description-value">${comments}</span></div>
          <div class="container-descr-inner"><p class="description">Downloads</p><span class="description-value">${downloads}</span></div>
        </div>
      </li>`
    )
    .join('');
}

async function loadMoreImages() {
  currentPage += 1;

  try {
    const data = await fetchImages(event.currentTarget.value, currentPage);

    if (data.hits.length === 0) {
      document.querySelector('.preload').classList.add('is-hidden');
      event.currentTarget.classList.add('is-hidden');
      iziToast.show({
        title: '❕',
        theme: 'light',
        message: `We're sorry, but you've reached the end of search results.`,
        messageSize: '20px',
        messageColor: '#808080',
        backgroundColor: '#e7fc44',
        position: 'topLeft',
        timeout: 5000,
      });
    } else {
      imageList.innerHTML += createMarkup(data.hits);
      gallery.refresh();
      const cardHeight = imageList.lastElementChild.getBoundingClientRect().height;
      window.scrollBy(0, cardHeight);
    }
  } catch (error) {
    handleError(error);
  }
}

function handleError(err) {
  console.error(err);
  imageList.innerHTML = '';
  iziToast.show({
    iconUrl: icon,
    theme: 'dark',
    message: 'Sorry, there is a problem with connection with the server.',
    messageSize: '16px',
    messageColor: 'white',
    backgroundColor: '#EF4040',
    position: 'center',
    timeout: 5000,
  });
}
