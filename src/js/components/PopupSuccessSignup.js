import Popup from './Popup';
import popupContent from '../utils/popupContent';
import header from '../../index';

export default class PopupSuccessSignup extends Popup {
  constructor() {
    super();
    this._switch = this.switch.bind(this);
    this._templ = popupContent.successRegister;
  }

  switch() {
    console.log(this);
    this.close();
    header.openPopup(true);
  }
}
