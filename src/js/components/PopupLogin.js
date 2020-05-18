import Popup from './Popup';
import popupContent from '../utils/popupContent';
import Form from './Form';
import MainApi from '../api/MainApi';

const form = (type, mainApi, popupContext) => new Form(type, mainApi, popupContext);

export default class PopupLogin extends Popup {
  constructor(state) {
    super();
    this.form = form;
    this.switch = this.switch.bind(this);
    this.state = {
      signin: state,
    };
  }

  _chooseTempl() {
    if (!this.state.signin) {
      this._templ = popupContent.register;
    } else {
      this._templ = popupContent.login;
    }
  }

  setContent() {
    this._chooseTempl();
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
        callback: this.switch,
      },
    ]);
    this.form(this.state.signin, new MainApi(), this).addValidation();
  }

  switch() {
    this.state.signin = !this.state.signin;
    this.clearContent();
    this.setContent();
  }
}
