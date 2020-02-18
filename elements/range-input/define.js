import templateElt  from "./template.js";

class RangeInput extends HTMLElement {
  static get observedAttributes() {
    return [
      "min",
      "max",
      "step",
      "value",
    ];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.appendChild(templateElt.content.cloneNode(true));
  }

  get input() {
    return this._input || (this._input = this.shadow.querySelector("input"));
  }

  get valueSpan() {
    return this._valueSpan || (this._valueSpan = this.shadow.querySelector("span"));
  }

  updateValue() {
    let fixedPlaces = Math.max(0, Math.ceil(Math.log10(1 / (this.input.step || 1)))) || 0;
    this.valueSpan.textContent = (+(this.input.value || 0)).toFixed(fixedPlaces);
    this.value = this.input.value;
  }

  reset() {
    this.input.value = this.getAttribute("value");
    this.updateValue();
  }

  clampValue() {
    let clampedValue = Math.min(this.max, Math.max(this.min, this.value));
    if (clampedValue !== this.input.value) {
      this.input.value = clampedValue;
      this.value = clampedValue;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.input.setAttribute(name, newValue);
      this[name] = newValue;
      this.clampValue();
      this.updateValue();
    }
  }

  connectedCallback() {
    this.connectedCallbackHasRan = true;

    this.input.min = this.getAttribute("min");
    this.input.max = this.getAttribute("max");
    this.input.value = this.getAttribute("value");
    this.input.step = this.getAttribute("step") || 1;

    this.updateValue();
    this.input.oninput = this.updateValue.bind(this);
  }
}

customElements.define('range-input', RangeInput);
