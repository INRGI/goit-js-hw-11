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
                // RENDER
                Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
            }
        })
        .catch((error)=>console.log(error))
        .finally(() => {
            searchFormSelect.reset();
        })
}
function onLoadMore() { };
