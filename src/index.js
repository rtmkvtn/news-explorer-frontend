import './index.css';
import Popup from './script/Popup';

const authButton = document.querySelector('.header__button');

authButton.addEventListener('click', () => {
  const popup = new Popup();
  popup.render();
});
