/* eslint-disable no-param-reassign */
import BaseComponent from './BaseComponent';
import popupContent from '../utils/popupContent';
import PopupSuccessSignup from './PopupSuccessSignup';
import CustomValidator from '../utils/customValidator';

const successSignupPopup = () => new PopupSuccessSignup();
const customValidator = (input, error) => new CustomValidator(input, error);

export default class Form extends BaseComponent {
  constructor(state, mainApi, popupContext) {
    super();
    this._customValidator = customValidator;
    this.form = document.forms.form;
    this.button = document.querySelector('.popup__button');
    this._inputs = this.form.querySelectorAll('.popup__input');
    this._errors = document.querySelectorAll('.popup__error');
    this.serverErrorElement = this.form.querySelector('.submit__error');
    this._mainApi = mainApi;
    this.popupContext = popupContext;
    this.successSignupPopup = successSignupPopup;
    this.state = {
      signin: state,
    };
  }

  _clear() {
    this._inputs.forEach((input) => (input.value = ''));
  }

  _getInfo() {
    this._getArticlesFromStorage();
    this._mainApi.getArticles().then((data) => {
      const articles = data;
      this._addDataToUserArticles(articles);
      this._putArticlesToStorage();
    });
    this._mainApi.getUserData().then((usr) => {
      const user = usr;
      const userName = user.name.substring(0, 1).toUpperCase() + user.name.substring(1);
      localStorage.setItem('userName', userName);
      document.location.href = './index.html';
    });
  }

  _inputValidation(input) {
    if (input.type === 'email') {
      this._customValidator(input, input.nextElementSibling).emailValidation();
    } else if (input.type === 'text') {
      this._customValidator(input, input.nextElementSibling).textValidation();
    } else if (input.type === 'password') {
      this._customValidator(input, input.nextElementSibling).passwordValidation();
    }
  }

  addValidation() {
    this._inputs.forEach((input) => input.addEventListener('input', (evt) => this._inputValidation(input, evt)));
    this._setListeners([
      {
        element: this.form,
        event: 'input',
        callback: (evt) => this._formValidation(evt),
      },
      {
        element: this.button,
        event: 'click',
        callback: (evt) => this.submit(evt),
      },
    ]);
  }

  _formValidation() {
    if (this.form.checkValidity()) {
      this.button.removeAttribute('disabled');
      this.button.classList.remove('popup__button_disabled');
    } else {
      this.button.setAttribute('disabled', true);
      this.button.classList.add('popup__button_disabled');
    }
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
    this._mainApi.signup(this.form.email.value, this.form.password.value, this.form.name.value).then((res) => {
      const resp = res;
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
        localStorage.setItem('jwt', resp.token);
        localStorage.setItem('tokenGoneAt', Date.now() + 7 * 24 * 60 * 60000);
        this._getInfo();
        this.popupContext.close();
      }
    });
  }
}
