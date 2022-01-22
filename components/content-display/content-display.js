import { BaseComponent } from "../BaseComponent.js";

export class ContentDisplay extends BaseComponent {
  constructor() {
    super();
  }

  templateLoaded() {
    console.log(this.shadowRoot.querySelector('slot'))
  }
}

customElements.define('content-display', ContentDisplay);