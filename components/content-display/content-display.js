import { BaseComponent } from "../BaseComponent.js";

export class ContentDisplay extends BaseComponent {
  constructor() {
    super();
  }

  templateLoaded() {
  }
}

customElements.define('content-display', ContentDisplay);