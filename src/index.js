import axios from "axios";
import Notiflix, { Loading } from "notiflix";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loading");
const catInfoDiv = document.querySelector(".cat-info");
const errorDiv = document.querySelector(".error");

const slim = new SlimSelect({
  select: breedSelect,
  settings: {
    placeholderText: 'Custom Placeholder Text',
  }
});

loader.style.display = "none";

fetchBreeds()
  .then((breeds) => {
    updateBreedSelector(breedSelect, breeds);
  })
  .catch((error) => {
      Notiflix.Report.failure('Error!', 'Something go wrong. Please, try again.', 'OK');
  });

function updateBreedSelector(select, breeds) {
    select.innerHTML = "";
    slim.setData(breeds.map(breed => ({ text: breed.name, value: breed.id })));
}

breedSelect.addEventListener("change", () => {
    const selectedBreedId = breedSelect.value;
    loader.style.display = "block";
    catInfoDiv.innerHTML = "";

    fetchCatByBreed(selectedBreedId)
    .then((catInfo) => {
      updateCatInfo(catInfo);
      loader.style.display = "none";
      errorDiv.style.display = "none";
    })
    .catch((error) => {
      errorDiv.style.display = "block";
      catInfoDiv.innerHTML = "";
      loader.style.display = "none";
    });
});

function updateCatInfo(catInfo) {
    catInfoDiv.innerHTML = "";
    errorDiv.style.display = "none";

    const { url, breeds } = catInfo[0];

    const catInfoHTML = `
        <img src="${url}" alt="${breeds[0].name}" width="400"/>
        <div class="text-box">
            <h1>${breeds[0].name}</h1>
            <p>${breeds[0].description}</p>
            <p><b>Temperament:</b> ${breeds[0].temperament}</p>
        </div>
    `;

    catInfoDiv.innerHTML = catInfoHTML;
}