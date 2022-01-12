export class BaseComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Apply HTML template
    this.fetchTemplate()
      .then(templateText => {
        document.body.insertAdjacentHTML('beforebegin', templateText.replace('<template>', '<template id="' + this.hyphenatedClassName() + '">'))
      })
      .then(() => {
        const template = document.getElementById(this.hyphenatedClassName()).content;
        shadow.appendChild(template.cloneNode(true));
      });

    // Apply external styles to the shadow dom
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', 'components/' +
      this.hyphenatedClassName() + '/' + this.hyphenatedClassName() + '.css');
    shadow.appendChild(linkElem);
  }

  fetchTemplate() {
    if (this.constructor.template != null) {
      return this.constructor.template;
    }

    this.constructor.template = fetch(window.location.href + 'components/'
      + this.hyphenatedClassName() + '/' + this.hyphenatedClassName()
      + '.html').then(templateFile => templateFile.text())
    return this.constructor.template
  }

  hyphenatedClassName() {
    /**
     * Splits current class name on capitals, joins with hyphen, 
     * and return lowercase string.
     */
    return this.constructor.name
      .match(/[A-Z][a-z]+/g).map(x => x.toLowerCase()).join("-");
  }
}