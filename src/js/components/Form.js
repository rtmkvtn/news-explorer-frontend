/* eslint-disable no-param-reassign */
import BaseComponent from './BaseComponent';
import CustomValidator from '../utils/customValidator';
import popupContent from '../utils/popupContent';
import MainAPI from '../api/MainApi';

const customValidator = (input, error) => new CustomValidator(input, error);

export default class Form extends BaseComponent {
  constructor() {
    super();
    this._customValidator = customValidator;
    this._mainApi = null;
  }

  addValidation(popupContext) {
    // Все дочерние классы юзают MainAPI
    // Здесь, полагаю, не страшно вызывать конструктор класса MainAPI, т.к. при изменении одного из дочерних классов,
    // ничего не произойдет с ним, путаницы не должно быть.
    this._mainApi = new MainAPI();
    this._form = document.forms.form;
    this._button = document.querySelector('.popup__button');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this._errors = document.querySelectorAll('.popup__error');
    this._serverErrorElement = this._form.querySelector('.submit__error');
    this._popupContext = popupContext;

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

  setServerError(text) {
    this._serverErrorElement.textContent = text;
  }

  _clear() {
    this._inputs.forEach((input) => (input.value = ''));
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
}
