import { BaseComponent } from "../BaseComponent.js";

export class ContentDisplay extends BaseComponent {
  static template = null;

  constructor() {
    super();
  }
}

customElements.define('content-display', ContentDisplay);