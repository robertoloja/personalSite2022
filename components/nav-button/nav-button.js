import { BaseComponent } from "../BaseComponent.js";

export class NavButton extends BaseComponent {
  static template = null;

  constructor() {
    super();
    //console.log(this.attributes.href)
    console.log(this.shadowRoot)
  }
}

customElements.define('nav-button', NavButton);