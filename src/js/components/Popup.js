import BaseComponent from './BaseComponent';
import popupContent from '../utils/popupContent';

export default class Popup extends BaseComponent {
  constructor() {
    super();
    this._popup = document.querySelector('.popup');
    this._content = null;
    this._templ = null;
    this.close = this.close.bind(this);
  }
  _chooseTempl() {}

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
        callback: this.switch,
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
}

// export default class Popup extends BaseComponent {
//   constructor(form, mainApi) {
//     super();
//     this.popup = document.querySelector('.popup');
//     this.form = form;
//     this.content = null;
//     this._close = this._close.bind(this);
//     this._mainApi = mainApi;
//     this.type = 'signup';
//   }

// }

// // export default class Popup extends BaseComponent {
// //   constructor(type, validator, mainApi) {
// //     super();
// //     this._switch = this._switch.bind(this);
// //     this._submit = this._submit.bind(this);
// //   }

// //   _submit(event) {
// //     event.preventDefault();
// //     if (this.type === 'register') {
// //       this._mainApi
// //         .signup(
// //           document.forms.form.email.value,
// //           document.forms.form.password.value,
// //           document.forms.form.name.value,
// //         )
// //         .then((res) => {
// //           const resp = res;
// //           console.log(resp);
// //           if (resp.message) {
// //             this._showErrorOnSubmit(this.popup.querySelector('.submit__error'), resp.message, 5000);
// //             // this.popup.querySelector('.submit__error').textContent = resp.message;
// //           } else {
// //             this._successPopupOpen();
// //           }
// //         });
// //     } else {
// //       this._mainApi.signin();
// //     }
// //   }

// //   _switch() {
// //     if (this.type === 'login') {
// //       this.type = 'register';
// //     } else {
// //       this.type = 'login';
// //     }
// //     this._close();
// //     this.content = this._chooseTemplate(this.type);
// //     this.render();
// //   }

// //   _successPopupOpen() {
// //     this.content.remove();
// //     this.content = this._chooseTemplate('registered');
// //     this.popup.appendChild(this.content);
// //     this.popup.classList.add('popup_is-opened');
// //     this._addListener(this.popup.querySelector('.popup__link'), 'click', this._switch);
// //   }
// // }
