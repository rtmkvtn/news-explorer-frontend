import BaseComponent from './BaseComponent';
import links from '../utils/links';
import headerButtons from '../utils/headerButtons';

export default class Header extends BaseComponent {
  constructor(popup, theme) {
    super();
    this._header = document.querySelector('.header');
    this._nav = document.querySelector('.header__links');
    this._popup = popup;

    this._mobileMenuButton = document.querySelector('.header__menu-button');

    this._state = {
      isLoggedIn: false,
      theme,
    };
  }

  openPopup(state) {
    this._popup.open(state);
  }

  // Меняет состояние isLoggedIn, запускает рендер
  changeLoggedState() {
    this._clearListeners();
    this._state.isLoggedIn = !this._state.isLoggedIn;
    if (!this._state.isLoggedIn) {
      localStorage.clear();
      if (document.location.href.includes('secondary')) {
        document.location.href = '../index.html';
      } else {
        document.location.href = './index.html';
      }
      return;
    }
    this.render();
  }

  render() {
    this._buildNav();
    this._nav.children.forEach((child) => child.classList.add(this._state.theme));

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

  _buildLoggedInNav() {
    this.toSecondaryLink = this._makeContentForDOM(links.toSavedArticles);
    this.button = this._makeContentForDOM(headerButtons.logged);
    this.button.querySelector('.button__text').textContent = localStorage.getItem('userName');
    this._nav.appendChild(this.toSecondaryLink);
    this._nav.appendChild(this.button);
    if (document.location.href.includes('secondary')) {
      this.toMainLink.classList.remove('header__link_active');
      this.toSecondaryLink.classList.add('header__link_active');
      this.toSecondaryLink.setAttribute('href', '#');
      this.toMainLink.setAttribute('href', '../index.html');
    } else {
      this.toMainLink.setAttribute('href', '#');
    }
    this._addListener(this.button, 'click', (evt) => this.changeLoggedState(evt));
  }

  _buildNotLoggedInNav() {
    this.button = this._makeContentForDOM(headerButtons.notLogged);
    this._nav.appendChild(this.button);
    this._addListener(this.button, 'click', (evt) => this._popup.open(evt));
  }

  _buildNav() {
    this.toMainLink = this._makeContentForDOM(links.toMain);
    this._nav.innerHTML = '';
    this._nav.appendChild(this.toMainLink);

    if (this._state.isLoggedIn) {
      this._buildLoggedInNav();
    } else {
      this._buildNotLoggedInNav();
    }
  }

  _mobileMenuOpen() {
    this._nav.classList.add('header__links_mobile');
    this._mobileMenuButton.firstElementChild.classList.remove('menu-button__icon');
    this._mobileMenuButton.firstElementChild.classList.add('menu-button__icon_close');
    this._header.querySelector('.header__title').classList.remove('header__title_black');
    this._mobileMenuButton.removeEventListener('click', (evt) => this._mobileMenuOpen(evt));
    this._addListener(this._mobileMenuButton, 'click', (evt) => this._mobileMenuClose(evt));
  }

  _mobileMenuClose() {
    this._nav.classList.remove('header__links_mobile');
    this._mobileMenuButton.firstElementChild.classList.remove('menu-button__icon_close');
    this._mobileMenuButton.firstElementChild.classList.add('menu-button__icon');
    if (this._state.theme) {
      this._header.querySelector('.header__title').classList.add(`header__title${this._state.theme}`);
    }
    this._mobileMenuButton.removeEventListener('click', (evt) => this._mobileMenuClose(evt));
    this._addListener(this._mobileMenuButton, 'click', (evt) => this._mobileMenuOpen(evt));
  }
}
