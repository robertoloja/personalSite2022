export class BaseComponent extends HTMLElement {
  constructor() {
    super();
    /**
     * TODO: Remove all async stuff from constructor. This should be a pure function with
     * no side-effects. 
     */

    // Apply HTML template
    this.fetchTemplate()
      .then(templateText => {
        if (!document.getElementById(this.hyphenatedClassName())) {
          document.body.insertAdjacentElement('afterbegin', this.parseHtmlIntoDomElement(templateText))
        }

        const template = document.getElementById(this.hyphenatedClassName()).content;
        this.attachShadow({ mode: "open" }).appendChild(template.cloneNode(true));

        // Apply external styles to the shadow dom
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'components/' +
          this.hyphenatedClassName() + '/' + this.hyphenatedClassName() + '.css');
        this.shadowRoot.appendChild(linkElem);
        console.log('shadowRoot created')
      });
    console.log('end of parent constructor')
  }

  parseHtmlIntoDomElement(text) {
    /**
     * Since the html template file arrives as raw text, it must be parsed into 
     * DOM elements. This method does so.
     */
    const newElement = (new DOMParser()).parseFromString(text, 'text/html')
    const template = newElement.querySelector('template')
    template.id = this.hyphenatedClassName()

    /*
    if (template.innerHTML) {
      let children = (new DOMParser()).parseFromString(template.innerHTML, 'text/html').body.children

      for (let child of children) {
        template.appendChild(child)
      }
    }*/
    return template
  }

  fetchTemplate() {
    /**
     * For child classes, Class.template starts as null, and is replaced by
     * a Promise. This method checks if the template is still null, and if
     * so, GETs the html template file.
     */
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