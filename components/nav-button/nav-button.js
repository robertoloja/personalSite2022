import { BaseComponent } from "../BaseComponent.js";

export class NavButton extends BaseComponent {
  constructor() {
    super();
  }

  templateLoaded() {
    if (this.attributes.href) {
      this.shadowRoot.querySelector('a').href = this.attributes.href.value
    }

    if ("selected" in this.attributes) {
      this.shadowRoot.querySelector('div').classList.add('selected')
    }
  }

  onClick() {
  }
}

customElements.define('nav-button', NavButton);