class HeaderApp extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="nav-container">
      <picture>
      <source type="image/webp" srcset="./brand.webp">
      <source type="image/png" srcset="./brand.png">
      <img src="./brand.png" id="nav-img" alt="hero-image-1">
    </picture>
      <button id="hamburger">☰</button>
      <nav id="side-nav" class="side-nav">
        <ul>
          <li><button id="closeBtn" aria-label="Buka menu navigasi" title="Menu navigasi">X</button></li>
          <li><a href="#/home">HOME</a></li>
          <li><a href="#/favorite">FAVORITE</a></li>
          <li><a href="https://github.com/hafidzahm">ABOUT US</a></li>
        </ul>
      </nav>
      </div>
      `;
  }
}

customElements.define('header-app', HeaderApp);
