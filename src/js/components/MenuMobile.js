import BaseComponent from './BaseComponent';

export default class MenuMobile extends BaseComponent {
  constructor() {
    super();
    this.menu = document.querySelector('.header__links');
    this.button = document.querySelector('.header__menu-button');
  }

  open() {
    this.menu.classList.add('header__links_mobile');
    this._clearListeners();
    this.button.firstElementChild.classList.remove('menu-button__icon');
    this.button.firstElementChild.classList.add('menu-button__icon_close');
    this._addListener(this.button, 'click', (evt) => this.close(evt));
  }

  close() {
    this._clearListeners();
    this.menu.classList.remove('header__links_mobile');
    this.button.firstElementChild.classList.remove('menu-button__icon_close');
    this.button.firstElementChild.classList.add('menu-button__icon');
    this._addListener(this.button, 'click', (evt) => this.open(evt));
  }
}
