import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40331003-99a3d5cb80482624416a8cb30';

const searchParams = new searchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40
});

export async function getImages(query, page) {
    return await axios.get(`${BASE_URL}?key=${API_KEY}&q=${query}&${searchParams}&page=${page}`)
}
