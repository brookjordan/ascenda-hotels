import templateElt  from "./template.js";

class HotelData extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.appendChild(templateElt.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadow.querySelector(".name").textContent = this.getAttribute("name");
    // TODO: sanitise
    let descriptionElt = this.shadow.querySelector(".description");
    descriptionElt.innerHTML = this.getAttribute("description");
    descriptionElt.onclick = e => {
      descriptionElt.classList.toggle("open");
    }
    this.shadow.querySelector(".description").innerHTML = this.getAttribute("description");
    this.shadow.querySelector("img").src = this.getAttribute("photo");
    this.shadow.querySelector(".currency").textContent = this.getAttribute("price-currency");
    this.shadow.querySelector(".value").textContent = this.getAttribute("price");
    this.shadow.querySelector(".address").innerHTML = this.getAttribute("address").split(",").join("<br>");
    this.shadow.querySelector(".rating").innerHTML = this.getAttribute("rating");

    let starsElt = this.shadow.querySelector(".stars");
    Array.from({ length: +this.getAttribute("stars") }, () => null).forEach(() => {
      starsElt.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 98"><path d="M49 0L20 98l79-58-99-0 80 58z"/></svg>';
    });

    let reviewSectionElt = this.shadow.querySelector(".review-section");
    let reviewToggleElt = this.shadow.querySelector(".reviews-toggle");
    let reviewsElt = this.shadow.querySelector(".reviews");
    let reviewsFragment = document.createDocumentFragment();
    let reviews = JSON.parse(this.getAttribute("reviews"));
    this.shadow.querySelector(".review-count").textContent = reviews.length;
    if (reviews.length) {
      reviews.forEach(review => {
        let reviewElt = document.createElement("li");
        reviewElt.innerHTML = `
          <h4>${review.user.name}: ${review.user.location}</h4>
          <h5>${review.title}: ${review.rating}*</h5>
          <div>${review.description}</div>
        `;
        reviewsFragment.appendChild(reviewElt);
      });
      reviewsElt.append(reviewsFragment);

      reviewToggleElt.onclick = () => {
        reviewSectionElt.classList.toggle("open");
      };
    } else {
      reviewSectionElt.remove();
    }
  }
}

customElements.define('hotel-data', HotelData);
