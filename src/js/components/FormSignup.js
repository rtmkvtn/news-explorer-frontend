/* eslint-disable no-param-reassign */
import Form from './Form';
import PopupSuccessSignup from './PopupSuccessSignup';

export default class FormSignup extends Form {
  constructor() {
    super();
    this._popupSuccess = null;
    this._popupContext = null;
  }

  submit() {
    this._disableForm();
    this._buttonLoading();
    this.setServerError('');
    this._mainApi
      .signup(this._form.email.value, this._form.password.value, this._form.name.value)
      .then((res) => {
        if (res.message) {
          return Promise.reject(res.message);
        }
        this._popupContext.close();
        const popupSuccess = new PopupSuccessSignup();
        return popupSuccess.open();
      })
      .catch((err) => this.setServerError(err))
      .finally(() => {
        this._clear();
        this._enableForm();
        this._buttonNormal();
      });
  }
}
