import { BaseComponent } from "../BaseComponent.js";

export class NavButton extends BaseComponent {
  constructor() {
    super();
  }

  templateLoaded() {
  }

  onClick() {
    console.log("foo")
  }
}

customElements.define('nav-button', NavButton);