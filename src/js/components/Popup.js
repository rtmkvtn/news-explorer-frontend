import BaseComponent from './BaseComponent';

export default class Popup extends BaseComponent {
  constructor() {
    super();
    this._popup = document.querySelector('.popup');
    this._content = null;
    this._templ = null;
    this.close = this.close.bind(this);
  }

  setContent() {
    this._content = this._makeContentForDOM(this._templ);
    this._popup.appendChild(this._content);
    this._setListeners([
      {
        element: this._popup.querySelector('.popup__close'),
        event: 'click',
        callback: (evt) => this.close(evt),
      },
      {
        element: document,
        event: 'mousedown',
        callback: (evt) => this._keyhandler(evt),
      },
      {
        element: document,
        event: 'keydown',
        callback: (evt) => this._keyhandler(evt),
      },
      {
        element: this._popup.querySelector('.popup__link'),
        event: 'click',
        callback: this._switch,
      },
      {
        element: window,
        event: 'scroll',
        callback: (evt) => this.noScroll(evt),
      },
    ]);
  }

  clearContent() {
    this._clearListeners();
    this._content.remove();
  }

  open() {
    this.setContent();
    this._popup.classList.add('popup_is-opened');
  }

  close() {
    this._clearListeners();
    this._content.remove();
    this._popup.classList.remove('popup_is-opened');
  }

  _keyhandler(event) {
    if ((event.target === this._popup && event.target !== this._content) || event.keyCode === 27) {
      this.close();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  noScroll() {
    window.scrollTo(0, 0);
  }
}
