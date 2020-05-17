import BaseComponent from './BaseComponent';
import popupContent from '../utils/popupContent';
import PopupSuccessSignup from './PopupSuccessSignup';
import header from '../../index';

const successSignupPopup = () => new PopupSuccessSignup();

export default class Form extends BaseComponent {
  constructor(state, validator, mainApi, popupContext) {
    super();
    this.form = document.forms.form;
    this.button = document.querySelector('.popup__button');
    this.serverErrorElement = this.form.querySelector('.submit__error');
    this._validator = validator;
    this._mainApi = mainApi;
    this.popupContext = popupContext;
    this.successSignupPopup = successSignupPopup;
    this.state = {
      signin: state,
    };
  }

  _clear() {
    this.form.email.value = '';
    this.form.password.value = '';
    this.form.name.value = '';
  }

  _getInfo() {
    this._getArticlesFromStorage();
    this._mainApi.getArticles().then((data) => {
      const articles = data;
      this._addDataToUserArticles(articles);
      this._putArticlesToStorage();
    });
  }

  addValidation() {
    this._setListeners([
      {
        element: this.form,
        event: 'input',
        callback: (evt) => this._validateForm(evt, this.form),
      },
      {
        element: this.button,
        event: 'click',
        callback: (evt) => this.submit(evt),
      },
    ]);
  }

  submit(event) {
    event.preventDefault();
    if (this.state.signin) {
      this.submitSignin();
    } else {
      this.submitSignup();
    }
  }

  setServerError(text) {
    this.serverErrorElement.textContent = text;
  }

  submitSignup() {
    this.setServerError('');
    this._mainApi
      .signup(this.form.email.value, this.form.password.value, this.form.name.value)
      .then((res) => {
        const resp = res;
        console.log(resp);
        if (resp.message) {
          this.setServerError(resp.message);
          this._clear();
        } else {
          this.popupContext.close();
          this.successSignupPopup(popupContent.successRegister).open();
        }
      });
  }

  submitSignin() {
    this.setServerError('');
    this._mainApi.signin(this.form.email.value, this.form.password.value).then((res) => {
      const resp = res;
      console.log(resp);
      if (resp.message) {
        this.setServerError(resp.message);
        this._clear();
      } else {
        this._getInfo();
        this.popupContext.close();
        localStorage.setItem('jwt', resp.token);
        localStorage.setItem('tokenGoneAt', Date.now() + 7 * 24 * 60 * 60000);
        this._mainApi.getUserData().then((usr) => {
          const user = usr;
          const userName = user.name.substring(0, 1).toUpperCase() + user.name.substring(1);
          localStorage.setItem('userName', userName);
          document.location.href = '../index.html';
        });
      }
    });
  }

  _validateForm(event, form) {
    if (event.target === this.form.password) {
      this._validator.passwordFormValidator(event);
    }
    if (event.target === this.form.email) {
      this._validator.emailFormValidator(event);
    } else {
      this._validator.textFormValidator(event);
    }

    if (form.checkValidity()) {
      this.button.removeAttribute('disabled');
      this.button.classList.remove('popup__button_disabled');
    } else {
      this.button.setAttribute('disabled', true);
      this.button.classList.add('popup__button_disabled');
    }
  }
}
