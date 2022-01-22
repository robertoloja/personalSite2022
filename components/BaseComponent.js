export class BaseComponent extends HTMLElement {
  constructor() {
    super();
    this.onclick = this.onClick
    this.attachShadow({ mode: "open" })
    if (this.constructor.id == null) this.constructor.id = 0;

    this.id = this.hyphenatedClassName() + this.constructor.id++

    // Apply external styles to the shadow dom
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', 'components/' +
      this.hyphenatedClassName() + '/' + this.hyphenatedClassName() + '.css');
    this.shadowRoot.appendChild(linkElem);

    // Apply HTML template, then call the templateLoaded method
    this.fetchTemplate()
      .then(templateText => {
        if (!document.getElementById(this.hyphenatedClassName())) {
          document.body.insertAdjacentElement('beforebegin', this.parseHtmlIntoDomElement(templateText))
        }

        const template = document.getElementById(this.hyphenatedClassName()).content;
        this.shadowRoot.appendChild(template.cloneNode(true));
      })
      .then(() => {
        this.templateLoaded()
      })
  }

  parseHtmlIntoDomElement(text) {
    /**
     * Since the html template file arrives as raw text, it must be parsed into 
     * DOM elements. This method does so.
     */
    const newElement = (new DOMParser()).parseFromString(text, 'text/html')
    const template = newElement.querySelector('template')
    template.id = this.hyphenatedClassName()

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

  templateLoaded() {
    /**
     * Overwrite this method in the child classes. This is called once
     * HTML template and CSS styles are loaded onto the component.
     */
    console.warn("Overwrite " + this.constructor.name + ".templatedLoaded()")
  }

  onClick() {
    console.warn("Overwrite " + this.constructor.name + ".onClick()")
  }
}