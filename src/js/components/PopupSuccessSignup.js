import Popup from './Popup';
import popupContent from '../utils/popupContent';
import PopupLogin from './PopupLogin';

const popupLogin = (signinState) => new PopupLogin(signinState);

export default class PopupSuccessSignup extends Popup {
  constructor() {
    super();
    this.switch = this.switch.bind(this);
    this._templ = popupContent.successRegister;
    this.popupLogin = popupLogin;
  }

  switch() {
    this.close();
    this.popupLogin(true).open();
  }
}
