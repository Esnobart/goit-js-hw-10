import Notiflix from "notiflix";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loading");
const catInfoDiv = document.querySelector(".cat-info");
const errorDiv = document.querySelector(".error");

loader.style.display = "none";

fetchBreeds()
  .then((breeds) => {
    updateBreedSelector(breedSelect, breeds);
  })
  .catch((error) => {
    Notiflix.Report.failure('Error!', 'Something go wrong. Please, try again.', 'OK');
  });

function updateBreedSelector(select, breeds) {
  breeds.unshift({ id: '0', name: 'Choose a cat'})


  select.innerHTML = "";
  breedSelect.innerHTML = breeds.map(breed => (`<option value="${breed.id}">${breed.name}</option>`));

  new SlimSelect({
    select: breedSelect,
  });
}

breedSelect.addEventListener("change", () => {

  const selectedBreedId = breedSelect.value;
  console.log(selectedBreedId);
  loader.style.display = "block";
  catInfoDiv.innerHTML = "";
  errorDiv.style.display = "none";

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