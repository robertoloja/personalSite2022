import { BaseComponent } from "../BaseComponent.js";

export class NavButton extends BaseComponent {
  static template = null;
  static id = 0

  constructor() {
    super();
    this.id = this.hyphenatedClassName() + NavButton.id
    NavButton.id += 1
  }

  connectedCallback() {
  }
}

customElements.define('nav-button', NavButton);