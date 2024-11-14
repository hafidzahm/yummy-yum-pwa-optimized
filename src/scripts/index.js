import 'regenerator-runtime'; /* for async await transpile */
import '../component/component';
import '../styles/responsive.css';
import '../styles/main.css';
import '../styles/style.css';
import App from './views/app';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const START = 3;
const NUMBER_OF_IMAGES = 25;

const app = new App({
  button: document.querySelector('#hamburger'),
  drawer: document.querySelector('#side-nav'),
  closeBtn: document.querySelector('#closeBtn'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
