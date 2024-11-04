class HeaderApp extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="nav-container">
      <img id="nav-img" src="./brand.png" alt="hero-image-1" />
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
