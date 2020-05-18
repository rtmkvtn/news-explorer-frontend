import BaseComponent from './BaseComponent';
import links from '../utils/links';
import headerButtons from '../utils/headerButtons';

export default class Header extends BaseComponent {
  constructor(popup, theme) {
    super();
    this.header = document.querySelector('.header');
    this.nav = document.querySelector('.header__links');
    this.popup = popup;

    this._mobileMenuButton = document.querySelector('.header__menu-button');

    this.state = {
      isLoggedIn: false,
      theme,
    };
  }

  changeLoggedState() {
    this.state.isLoggedIn = !this.state.isLoggedIn;
    if (!this.state.isLoggedIn) {
      localStorage.clear();
      document.location.href = '../index.html';
      return;
    }
    this.render();
  }

  render() {
    this._buildNav();
    this.nav.children.forEach((child) => child.classList.add(this.state.theme));

    this._addListener(this._mobileMenuButton, 'click', (evt) => this._mobileMenuOpen(evt));
  }

  onLoadRender() {
    if (localStorage.getItem('jwt')) {
      document.cookie = `jwt=${localStorage.jwt}`;
      this.changeLoggedState(localStorage.getItem('userName'));
    } else {
      if (document.location.href.includes('secondary')) {
        document.location.href = '../index.html';
        return;
      }
      this.render();
    }
  }

  _buildNav() {
    this.toMainLink = this._makeContentForDOM(links.toMain);
    this.nav.innerHTML = '';
    this.nav.appendChild(this.toMainLink);

    if (this.state.isLoggedIn) {
      this.toSecondaryLink = this._makeContentForDOM(links.toSavedArticles);
      this.button = this._makeContentForDOM(headerButtons.logged);
      this.button.querySelector('.button__text').textContent = localStorage.getItem('userName');
      this.nav.appendChild(this.toSecondaryLink);
      this.nav.appendChild(this.button);
      if (document.location.href.includes('secondary')) {
        this.toMainLink.classList.remove('header__link_active');
        this.toSecondaryLink.classList.add('header__link_active');
        this.toSecondaryLink.setAttribute('href', '#');
      }
      this._addListener(this.button, 'click', (evt) => this.changeLoggedState(evt));
    } else {
      this.button = this._makeContentForDOM(headerButtons.notLogged);
      this.nav.appendChild(this.button);
      this._addListener(this.button, 'click', (evt) => this.popup.open(evt));
    }
  }

  _mobileMenuOpen() {
    this.nav.classList.add('header__links_mobile');
    this._mobileMenuButton.firstElementChild.classList.remove('menu-button__icon');
    this._mobileMenuButton.firstElementChild.classList.add('menu-button__icon_close');
    this.header.querySelector('.header__title').classList.remove('header__title_black');
    this._mobileMenuButton.removeEventListener('click', (evt) => this._mobileMenuOpen(evt));
    this._addListener(this._mobileMenuButton, 'click', (evt) => this._mobileMenuClose(evt));
  }

  _mobileMenuClose() {
    this.nav.classList.remove('header__links_mobile');
    this._mobileMenuButton.firstElementChild.classList.remove('menu-button__icon_close');
    this._mobileMenuButton.firstElementChild.classList.add('menu-button__icon');
    if (this.state.theme) {
      this.header.querySelector('.header__title').classList.add(`header__title${this.state.theme}`);
    }
    this._mobileMenuButton.removeEventListener('click', (evt) => this._mobileMenuClose(evt));
    this._addListener(this._mobileMenuButton, 'click', (evt) => this._mobileMenuOpen(evt));
  }
}
