import Popup from './Popup';
import popupContent from '../utils/popupContent';

export default class PopupSuccessSignup extends Popup {
  constructor(popupLoginClass) {
    super();
    this._switch = this.switch.bind(this);
    this._templ = popupContent.successRegister;
    this._popupLogin = popupLoginClass;
  }

  switch() {
    console.log(this);
    this.close();
    this._popupLogin.open();
  }
}
