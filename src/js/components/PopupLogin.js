import Popup from './Popup';
import popupContent from '../utils/popupContent';

export default class PopupLogin extends Popup {
  constructor(state, signupFormClass, signinFormClass) {
    super();
    this._switch = this.switch.bind(this);
    this._signupForm = signupFormClass;
    this._signinForm = signinFormClass;
    this._state = {
      signin: state,
    };
  }

  open(state) {
    if (state === true) {
      this._state.signin = state;
    }
    this.setContent();
    this._popup.classList.add('popup_is-opened');
    document.querySelector('.root').classList.add('root_popup');
  }

  _chooseTempl() {
    if (!this._state.signin) {
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
        callback: this._switch,
      },
    ]);
    if (!this._state.signin) {
      this._signupForm.addValidation(this);
    } else {
      this._signinForm.addValidation(this);
    }
  }

  switch() {
    this._state.signin = !this._state.signin;
    this.clearContent();
    this.setContent();
  }
}
