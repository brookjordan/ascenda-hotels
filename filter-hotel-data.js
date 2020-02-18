import updateHotelDisplay from "./update-hotel-display.js";

let ratingFilter = document.querySelector(".rating-filter");
ratingFilter.oninput = updateHotelDisplay;

let starFilter = document.querySelector(".star-filter");
starFilter.oninput = updateHotelDisplay;

let priceFilter = document.querySelector(".price-filter");
priceFilter.oninput = updateHotelDisplay;

let nameSearch = document.querySelector(".name-search");
nameSearch.oninput = updateHotelDisplay;

let priceSort = document.querySelector(".price-sort");
priceSort.onchange = updateHotelDisplay;

let filterReset = document.querySelector(".filter-reset");
filterReset.onclick = () => {
  setTimeout(() => {
    ratingFilter.reset();
    starFilter.reset();
    priceFilter.reset();
    updateHotelDisplay();
  }, 0);
}

// TODO: be better locale aware
const simplifyString = str => str.trim().toLowerCase().replace(/[^a-z0-9]/gi, '');

export default function(hotelsData) {
  let minRating = +ratingFilter.value;
  let minStars = +starFilter.value;
  let maxPrice = +priceFilter.value;
  let nameIncludes = simplifyString(nameSearch.value);
  let priceSortOrder = priceSort.value;

  let filteredHotelsData = hotelsData
    .filter(({ stars }) => stars >= minStars)
    .filter(({ rating }) => rating >= minRating)
    .filter(({ price }) => price <= maxPrice)
    .filter(({ name }) => !nameIncludes || simplifyString(name).includes(nameIncludes));

  if (priceSortOrder === "none") {
    return filteredHotelsData;
  } else {
    return filteredHotelsData
      .sort((a, b) => {
        if (priceSortOrder === "ascending") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      })
  }
}
