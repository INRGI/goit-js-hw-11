import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import { getImages } from "./pixabay-service";

const searchSelect = document.querySelector('.search-form');
const gallerySelect = document.querySelector('.gallery');
