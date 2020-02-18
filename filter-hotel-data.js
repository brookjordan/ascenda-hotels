import updateHotelDisplay from "./update-hotel-display.js";

let previousHotelsData = {};

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

let form = document.querySelector("form");
form.onreset = () => {
  ratingFilter.reset();
  starFilter.reset();
  priceFilter.reset();
  // timeout to ensure inputs are updated before reading values
  setTimeout(() => {
    updateHotelDisplay();
  }, 0);
}

// TODO: be better locale aware
const simplifyString = str => str.trim().toLowerCase().replace(/[^a-z0-9]/gi, '');

function updateFilterValues(hotelsData) {
  let hotelRatings = hotelsData.map(hotelData => hotelData.rating);
  let minRating = Math.min(...hotelRatings);
  let maxRating = Math.max(...hotelRatings);

  let hotelStars = hotelsData.map(hotelData => hotelData.stars);
  let minStars = Math.min(...hotelStars);
  let maxStars = Math.max(...hotelStars);

  let hotelPrices = hotelsData.map(hotelData => hotelData.price);
  let minPrice = Math.min(...hotelPrices);
  let maxPrice = Math.max(...hotelPrices);

  ratingFilter.setAttribute("min", minRating);
  ratingFilter.setAttribute("max", maxRating);
  starFilter.setAttribute("min", minStars);
  starFilter.setAttribute("max", maxStars);
  priceFilter.setAttribute("min", minPrice);
  priceFilter.setAttribute("max", maxPrice);
}

export default function(hotelsData) {
  let minRating = +ratingFilter.value;
  let minStars = +starFilter.value;
  let maxPrice = +priceFilter.value;
  let nameIncludes = simplifyString(nameSearch.value);
  let priceSortOrder = priceSort.value;

  if (previousHotelsData !== hotelsData) {
    updateFilterValues(hotelsData);
    previousHotelsData = hotelsData;
  }

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
