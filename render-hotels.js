import emptyElement from "./helpers/empty-element.js";

let hotelsElement = document.querySelector(".hotels");

export default function(hotelsData) {
  let hotelFragment = document.createDocumentFragment();
  hotelsData.forEach(hotelData => {
    let hotelElt = document.createElement("hotel-data");

    hotelElt.setAttribute("price-currency", "£");
    hotelElt.setAttribute("name", hotelData.name);
    hotelElt.setAttribute("price", hotelData.price);
    hotelElt.setAttribute("stars", hotelData.stars);
    hotelElt.setAttribute("photo", hotelData.photo);
    hotelElt.setAttribute("rating", hotelData.rating);
    hotelElt.setAttribute("address", hotelData.address);
    hotelElt.setAttribute("description", hotelData.description);
    hotelElt.setAttribute("reviews", JSON.stringify(hotelData.reviews));

    hotelElt.classList.add("hotel");
    hotelFragment.appendChild(hotelElt);
  });
  emptyElement(hotelsElement);
  hotelsElement.append(hotelFragment);
}
