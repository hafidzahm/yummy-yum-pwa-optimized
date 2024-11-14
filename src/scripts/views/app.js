import DrawerInitiator from '../utils/drawer-initiator';

import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
import { FalsePageTemplate } from './templates/template-creator';

class App {
  constructor({ button, drawer, closeBtn, content }) {
    this._button = button;
    this._drawer = drawer;
    this._closeBtn = closeBtn;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      closeBtn: this._closeBtn,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    if (page) {
      this._content.innerHTML = await page.render();
      await page.afterRender();
    } else {
      this._content.innerHTML = FalsePageTemplate();
    }

    const buttonSkip = document.querySelector('#skip-link');
    const main = document.querySelector('#restaurant-list');
    buttonSkip.addEventListener('click', (event) => {
      event.preventDefault();
      main.focus();
    });
  }
}

export default App;
