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
      display: inline-block;
    }
  </style>

  <label>
    <slot></slot>: <span></span>
    <input type="range">
  </label>
`;

export default templateElt;
