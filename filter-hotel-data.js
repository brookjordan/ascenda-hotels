import updateHotelDisplay from "./update-hotel-display.js";

let previousHotelsData = {};
let ratingFilter;
let starFilter;
let priceFilter;
let nameSearch;
let priceSort;
let form;

export function initFilterElements() {
  ratingFilter = document.querySelector(".rating-filter");
  ratingFilter.oninput = updateHotelDisplay;

  starFilter = document.querySelector(".star-filter");
  starFilter.oninput = updateHotelDisplay;

  priceFilter = document.querySelector(".price-filter");
  priceFilter.oninput = updateHotelDisplay;

  nameSearch = document.querySelector(".name-search");
  nameSearch.oninput = updateHotelDisplay;

  priceSort = document.querySelector(".price-sort");
  priceSort.onchange = updateHotelDisplay;

  form = document.querySelector("form");
  form.onreset = () => {
    ratingFilter.reset();
    starFilter.reset();
    priceFilter.reset();
    // timeout to ensure inputs are updated before reading values
    setTimeout(() => {
      updateHotelDisplay();
    }, 0);
  }
}

// TODO: be better locale aware
const simplifyString = str => str.trim().toLowerCase().replace(/[^a-z0-9]/gi, '');

function updateFilterValues(hotelsData) {
  let hotelRatings = hotelsData.map(hotelData => hotelData.rating);
  let minRating = Math.min(...hotelRatings);
  let maxRating = Math.max(...hotelRatings);
  ratingFilter.setAttribute("min", minRating);
  ratingFilter.setAttribute("max", maxRating);

  let hotelStars = hotelsData.map(hotelData => hotelData.stars);
  let minStars = Math.min(...hotelStars);
  let maxStars = Math.max(...hotelStars);
  starFilter.setAttribute("min", minStars);
  starFilter.setAttribute("max", maxStars);

  let hotelPrices = hotelsData.map(hotelData => hotelData.price);
  let minPrice = Math.min(...hotelPrices);
  let maxPrice = Math.max(...hotelPrices);
  priceFilter.setAttribute("min", minPrice);
  priceFilter.setAttribute("max", maxPrice);
}

export function filterHotelData({
  hotelsData = [],
  minStars = 0,
  maxPrice = 9e99,
  minRating = 0,
  nameSearchTerm = "",
  priceSortOrder = "none",
}) {
  let nameIncludes = simplifyString(nameSearchTerm);

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

export function getFilteredHotelData(hotelsData) {
  let minRating = +ratingFilter.value;
  let minStars = +starFilter.value;
  let maxPrice = +priceFilter.value;
  let priceSortOrder = priceSort.value;
  let nameSearchTerm = nameSearch.value;

  if (previousHotelsData !== hotelsData) {
    updateFilterValues(hotelsData);
    previousHotelsData = hotelsData;
  }

  return filterHotelData({
    hotelsData,
    minStars,
    maxPrice,
    minRating,
    nameSearchTerm,
    priceSortOrder,
  });
}
