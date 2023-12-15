import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_0lqGlWdkN0gJ9gkKY0n6wKf5e1KKPtKNTjXe228ZQFGtRJ0r5fcggdqNoE158107";

export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => response.data)
    .catch(error => {
      Notiflix.Report.failure('Error!', 'Something go wrong. Please, try again.', 'OK');
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return axios.get(url)
    .then(response => response.data)
    .catch(error => {
      Notiflix.Report.failure('Error!', 'Something go wrong. Please, try again.', 'OK');
      throw error;
    });
}
