import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_0lqGlWdkN0gJ9gkKY0n6wKf5e1KKPtKNTjXe228ZQFGtRJ0r5fcggdqNoE158107";

const BASE_URL = "https://api.thecatapi.com/v1";

function apiError(error) {
  Notiflix.Report.failure('Error!', 'Something go wrong. Please, try again.', 'OK');
  throw error;
}

export function fetchBreeds() {
  return axios.get(`${BASE_URL}/v1/breeds`)
    .then(response => response.data)
    .catch(apiError);
}

export function fetchCatByBreed(breedId) {
  return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(apiError);
}
