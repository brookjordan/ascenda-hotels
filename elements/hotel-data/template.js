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

    button,
    input {
      color: inherit;
      font: inherit;
    }

    h1, h2, h3, h4, h5, h6, button, [type="button"] {
      font-family: var(--f-heading);
      font-weight: 600;
    }

    :host {
      display: flex;
      flex-direction: column;
      padding: 10px;
      border-radius: 5px;
      background: white;
      box-shadow: 0 1px 2px rgb(0 0 0 / 0.3);
      color: var(--c-black);
    }

    img {
      height: 200px;
      margin: 10px 0;
      object-fit: cover;
      object-position: 50% 50%;
      border-radius: 4px;
    }

    .currency {
      color: var(--c-gray);
      font-size: 0.8em;
      margin-right: 0.1em;
      font-weight: 400;
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
    .description > br {
      display: none;
    }
    .description > p:not(:first-child) {
      margin-top: 10px;
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
    .stars svg {
      width: 20px;
      height: 20px;
      fill: var(--c-yellow);
    }
    .stars i:not(:first-child) {
      margin-left: 2px;
    }
    .reviews {
      display: none;
    }
    .reviews > li:not(:first-child) {
      margin-top: 15px;
    }
    .review-section.open .reviews {
      display: block;
    }
    .reviews-toggle {
      width: 100%;
      padding: 5px;
      margin-top: 10px;
      background: var(--c-blue);
      color: white;
      border: 0;
      border-radius: 4px;
      -webkit-appearance: none;
         -moz-appearance: none;
              appearance: none;
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

  <img>

  <span class="rating"></span>
  <div class="description"></div>
  <h3>Address:</h3>
  <div class="address"></div>
  <div class="review-section">
    <button class="reviews-toggle">Toggle <span class="review-count"></span> reviews</button>
    <ul class="reviews"></ul>
  </div>
`;

export default templateElt;
