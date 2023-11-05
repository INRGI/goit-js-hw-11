import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import { getImages } from "./pixabay-service";

const searchFormSelect = document.querySelector('.search-form');
const gallerySelect = document.querySelector('.gallery');
const loadMoreSelect = document.querySelector('.load-more');

let query = '';
let page = 1;
let simpleLightBox;

searchFormSelect.addEventListener('submit', onSubmit);
loadMoreSelect.addEventListener('click', onLoadMore);


function onSubmit(event) {
    event.preventDefault()
    page = 1;
    query = event.currentTarget.searchQuery.value.trim();
    gallerySelect.innerHTML = '';

    if (query === '') {
        Notiflix.Notify.failure('The search string cannot be empty.')
        return;
    }
    getImages(query, page)
        .then(({ data }) => {
            if (data.totalHits === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            } else {
                renderGallery(data.hits);
                simpleLightBox = new SimpleLightbox('.gallery a').refresh();
                loadMoreSelect.classList.remove('is-hidden');
                Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
            }
        })
        .catch((error)=>console.log(error))
        .finally(() => {
            searchFormSelect.reset();
        })
}
function onLoadMore() {
    page += 1;
    simpleLightBox.destroy();
    loadMoreSelect.classList.add('is-hidden');
    getImages(query, page)
        .then(({ data }) => {
            const totalPages = Math.ceil(data.totalHits / 40);
            renderGallery(data.hits);
            simpleLightBox = new SimpleLightbox('.gallery a').refresh();
            loadMoreSelect.classList.remove('is-hidden');
            if (page > totalPages) {
                loadMoreSelect.classList.add('is-hidden');
                Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
            }
        })
        .catch(error => console.log(error))
};

function renderGallery(images) {
    const markup = images.map(image => {
        const { id, largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image;
        return `
        <a class="gallery__link" href="${largeImageURL}">
          <div class="gallery-item" id="${id}">
            <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes</b>${likes}</p>
              <p class="info-item"><b>Views</b>${views}</p>
              <p class="info-item"><b>Comments</b>${comments}</p>
              <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
          </div>
        </a>`
    }).join('');

    gallerySelect.insertAdjacentHTML('beforeend', markup);
}
