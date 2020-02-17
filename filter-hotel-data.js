import updateHotelDisplay from "./update-hotel-display.js";

let ratingFilter = document.querySelector(".rating-filter");
ratingFilter.oninput = updateHotelDisplay;

let starFilter = document.querySelector(".star-filter");
starFilter.oninput = updateHotelDisplay;

let priceFilter = document.querySelector(".price-filter");
priceFilter.oninput = updateHotelDisplay;

export default function(hotelsData) {
  let minRating = +ratingFilter.value;
  let minStars = +starFilter.value;
  let maxPrice = +priceFilter.value;

  return hotelsData
    .filter(({ stars }) => stars >= minStars)
    .filter(({ rating }) => rating >= minRating)
    .filter(({ price }) => price <= maxPrice);
}
