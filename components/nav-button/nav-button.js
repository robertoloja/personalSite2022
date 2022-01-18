import { BaseComponent } from "../BaseComponent.js";

export class NavButton extends BaseComponent {
  constructor() {
    super();
  }

  templateLoaded() {
  }
}

customElements.define('nav-button', NavButton);