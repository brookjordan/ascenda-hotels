import templateElt  from "./template.js";

class RangeInput extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.appendChild(templateElt.content.cloneNode(true));
  }

  updateValue() {
    this.valueSpan.textContent = this.input.value;
    this.value = this.input.value;
  }

  reset() {
    this.input.value = this.getAttribute("value");
    this.updateValue();
  }

  connectedCallback() {
    this.valueSpan = this.shadow.querySelector("span");
    this.input = this.shadow.querySelector("input");

    this.input.min = this.getAttribute("min");
    this.input.max = this.getAttribute("max");
    this.input.value = this.getAttribute("value");

    this.updateValue();
    this.input.oninput = this.updateValue.bind(this);
  }
}

customElements.define('range-input', RangeInput);
