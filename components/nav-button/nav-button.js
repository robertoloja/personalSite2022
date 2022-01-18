import { BaseComponent } from "../BaseComponent.js";

export class NavButton extends BaseComponent {
  constructor() {
    super();
  }

  templateLoaded() {
    this.shadowRoot.querySelector('a').href = 'google.com'
    console.log(this.shadowRoot.querySelector('a'))
  }
}

customElements.define('nav-button', NavButton);