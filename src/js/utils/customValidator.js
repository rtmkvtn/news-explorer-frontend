import validErrors from '../constants/validErrors';

export default class CustomValidator {
  constructor(input, error) {
    this._input = input;
    this._error = error;
  }

  emailValidation() {
    if (!this._input.validity.valid) {
      this._error.textContent = validErrors.EMAIL_NOT_EMAIL;
    } else {
      this._error.textContent = '';
    }
  }

  textValidation() {
    if (this._input.value.length === 0) {
      this._error.textContent = 'Это обязательное поле!';
    } else if (this._input.value.length > 30 || this._input.value.length < 2) {
      this._error.textContent = validErrors.STRING_LENGTH;
    } else {
      this._error.textContent = '';
    }
  }

  passwordValidation() {
    if (this._input.value.length === 0) {
      this._error.textContent = 'Это обязательное поле!';
    } else if (this._input.value.length < 8) {
      this._error.textContent = validErrors.PASSWORD_SHORT;
    } else if (this._input.value.length > 30) {
      this._error.textContent = validErrors.PASSWORD_LONG;
    } else {
      this._error.textContent = '';
    }
  }
}
