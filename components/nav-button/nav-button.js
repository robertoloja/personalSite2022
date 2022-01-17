import { BaseComponent } from "../BaseComponent.js";

export class NavButton extends BaseComponent {
  constructor() {
    super();
  }

  templateLoaded() {
    console.log(this.shadowRoot.querySelector('a'))
  }
}

customElements.define('nav-button', NavButton);