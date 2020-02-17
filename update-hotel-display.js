import getHotelData from "./get-hotel-data.js";
import filterHotelData from "./filter-hotel-data.js";
import renderHotels from "./render-hotels.js";

export default async function() {
  let hotelData = await getHotelData();
  let filteredHotelData = filterHotelData(hotelData);
  renderHotels(filteredHotelData);
}
