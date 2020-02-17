let templateElt = document.createElement('template');
templateElt.innerHTML = /*html*/`
  <style>
    *,
    ::before,
    ::after {
      box-sizing: border-box;
    }

    body {
      background: #eee;
      padding: 20px;
    }

    p, h1, h2, h3, h4, h5, h6,
    body {
      margin: 0;
    }

    :host {
      display: block;
      padding: 10px;
      border-radius: 5px;
      background: white;
      box-shadow: 0 1px 2px rgb(0 0 0 / 0.3);
    }

    .description {
      max-height: 150px;
      overflow: hidden;
      margin: 10px -5px;
      overflow-y: auto;
      box-shadow: inset 0 1px 3px rgb(0 0 0 / 0.3);
      border-radius: 5px;
      padding: 5px;
      background: #f9f9f9;
    }
    .description.open {
      max-height: none;
      box-shadow: none;
      background: none;
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
    .reviews-toggle {
      width: 100%;
      padding: 5px;
      margin-top: 10px;
      background: #ddd;
      border: 0;
    }
    .reviews-toggle:focus:not(:focus-visible) {
      outline: 0;
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
    <button class="reviews-toggle">Toggle <span class="review-count"></span> reviews</button>
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
