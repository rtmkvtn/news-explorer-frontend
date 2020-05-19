/* eslint-disable no-param-reassign */
import BaseComponent from './BaseComponent';
import popupContent from '../utils/popupContent';
import PopupSuccessSignup from './PopupSuccessSignup';
import CustomValidator from '../utils/customValidator';
import MainAPI from '../api/MainApi';

// Нужно передавать попап, который появится после успешной регистрации и валидатор для формы,
// устанавливающий кастомные ошибки валидации
const successSignupPopup = () => new PopupSuccessSignup();
const customValidator = (input, error) => new CustomValidator(input, error);
const mainApi = () => new MainAPI();

export default class Form extends BaseComponent {
  constructor(state, popupContext) {
    super();
    this._successSignupPopup = successSignupPopup;
    this._customValidator = customValidator;

    this._form = document.forms.form;
    this._button = document.querySelector('.popup__button');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this._errors = document.querySelectorAll('.popup__error');
    this._serverErrorElement = this._form.querySelector('.submit__error');
    this._mainApi = mainApi;
    this._popupContext = popupContext;

    this._state = {
      signin: state,
    };
  }

  _clear() {
    this._inputs.forEach((input) => (input.value = ''));
  }

  // Берет массив статей пользователя с сервера.
  // Записывает его в localStorage, так же записывает userName туда же
  _getInfo() {
    this._getArticlesFromStorage();
    this._mainApi()
      .getArticles()
      .then((data) => {
        const articles = data;
        this._addDataToUserArticles(articles);
        this._putArticlesToStorage();
      });
    this._mainApi()
      .getUserData()
      .then((usr) => {
        const user = usr;
        const userName = user.name.substring(0, 1).toUpperCase() + user.name.substring(1);
        localStorage.setItem('userName', userName);
        window.location.href = './index.html';
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
        element: this._form,
        event: 'input',
        callback: (evt) => this._formValidation(evt),
      },
      {
        element: this._button,
        event: 'click',
        callback: (evt) => this.submit(evt),
      },
    ]);
  }

  _formValidation() {
    if (this._form.checkValidity()) {
      this._enableForm();
    } else {
      this._disableForm();
    }
  }

  _enableForm() {
    this._button.removeAttribute('disabled');
    this._button.classList.remove('popup__button_disabled');
  }

  _disableForm() {
    this._button.setAttribute('disabled', true);
    this._button.classList.add('popup__button_disabled');
  }

  _buttonLoading() {
    this._buttonText = this._button.textContent;
    this._button.textContent = '';
    this._button.appendChild(this._makeContentForDOM(popupContent.loader));
  }

  _buttonNormal() {
    this._button.textContent = this._buttonText;
  }

  submit(event) {
    event.preventDefault();
    if (this._state.signin) {
      this.submitSignin();
    } else {
      this.submitSignup();
    }
  }

  setServerError(text) {
    this._serverErrorElement.textContent = text;
  }

  submitSignup() {
    this._disableForm();
    this._buttonLoading();
    this.setServerError('');
    this._mainApi()
      .signup(this._form.email.value, this._form.password.value, this._form.name.value)
      .then((res) => {
        const resp = res;
        if (resp.message) {
          this.setServerError(resp.message);
          this._clear();
        } else {
          this._popupContext.close();
          this._successSignupPopup(popupContent.successRegister).open();
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this._enableForm();
        this._buttonNormal();
      });
  }

  submitSignin() {
    this._disableForm();
    this._buttonLoading();
    this.setServerError('');
    this._mainApi()
      .signin(this._form.email.value, this._form.password.value)
      .then((res) => {
        const resp = res;
        if (resp.message) {
          this.setServerError(resp.message);
          this._clear();
        } else {
          localStorage.setItem('jwt', resp.token);
          localStorage.setItem('tokenGoneAt', Date.now() + 7 * 24 * 60 * 60000);
          this._getInfo();
          this._popupContext.close();
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this._enableForm();
        this._buttonNormal();
      });
  }
}
