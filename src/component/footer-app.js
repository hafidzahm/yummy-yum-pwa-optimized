class FooterApp extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="container-footer">HUNGRY? Lets YUMMY YUM!</footer>
      `;
  }
}

customElements.define('footer-app', FooterApp);
