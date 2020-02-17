let templateElt = document.createElement('template');
templateElt.innerHTML = /*html*/`
  <style>
    :host {
      display: block;
      padding: 5px;
      border-radius: 5px;
      background: white;
      box-shadow: 0 1px 2px rgb(0 0 0 / 0.3);
    }

    .description {
      max-height: 150px;
      overflow: hidden;
      margin-bottom: 20px;
      overflow-y: auto;
    }
    .description.open {
      max-height: none;
    }
    .stars {
      display: inline-flex;
      gap: 2px;
    }
    .stars i {
      width: 20px;
      height: 20px;
      background: red;
    }
    .stars i:not(:first-child) {
      margin-left: 2px;
    }
    .reviews {
      display: none;
    }
    .review-section.open .reviews {
      display: block;
    }
  </style>
  <h2>
    <span class="stars"></span>
    <span class="name"></span>
    -
    <span class="currency"></span><span class="value"></span>
  </h2>

  <span class="rating"></span>
  <div class="description"></div>
  <div class="address"></div>
  <div class="review-section">
    <h2>Reviews</h2>
    <ul class="reviews"></ul>
  </div>
`;

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
    this.shadow.querySelector(".currency").textContent = this.getAttribute("price-currency");
    this.shadow.querySelector(".value").textContent = this.getAttribute("price");
    this.shadow.querySelector(".address").innerHTML = this.getAttribute("address").split(",").join("<br>");
    this.shadow.querySelector(".rating").innerHTML = this.getAttribute("rating");

    let starsElt = this.shadow.querySelector(".stars");
    Array.from({ length: +this.getAttribute("stars") }, () => null).forEach(() => {
      starsElt.appendChild(document.createElement("i"));
    });

    let reviewSectionElt = this.shadow.querySelector(".review-section");
    let reviewsElt = this.shadow.querySelector(".reviews");
    let reviewsFragment = document.createDocumentFragment();
    let reviews = JSON.parse(this.getAttribute("reviews"));
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

      reviewSectionElt.onclick = () => {
        reviewSectionElt.classList.toggle("open");
      };
    } else {
      reviewSectionElt.remove();
    }
  }
}

customElements.define('hotel-data', HotelData);
