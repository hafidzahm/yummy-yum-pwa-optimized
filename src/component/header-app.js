class HeaderApp extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="nav-container">
      <div id="nav-img">
      <a href="#/home">
      <picture>
      <source type="image/webp" srcset="./brand.webp">
      <source type="image/png" srcset="./brand.png">
      <img src="./brand.png" alt="hero-image-1">
    </picture>
    </a>
    </div>
      <button id="hamburger" aria-label="Buka menu navigasi" title="Menu navigasi">☰</button>
      <nav id="side-nav" class="side-nav">
        <ul>
          <li><button id="closeBtn" aria-label="Tutup menu navigasi" title="Tutup navigasi">X</button></li>
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
