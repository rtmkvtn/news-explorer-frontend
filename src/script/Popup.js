export default class Popup {
  constructor() {
    this.popup = null;
    this.close = this.close.bind(this);
  }

  templateRegister() {
    this.templatePopup = `
      <div class="popup popup_is-opened"> <!-- Нужно добавить класс popup_is-opened, чтобы открыть-->
      <div class="popup__content">
          <div class="popup__close">
            <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="1.93934" y1="25.9393" x2="25.9393" y2="1.93934" stroke="white" stroke-width="3"/>
              <line x1="2.06066" y1="1.93934" x2="26.0607" y2="25.9393" stroke="white" stroke-width="3"/>
              </svg>
          </div>
          <h3 class="popup__title">Регистрация</h3>
            <form class="popup__form" name="form">
                <p class="popup__input-title">Email</p>
                <input type="text" name="input__one" class="popup__input" placeholder="Введите почту" required pattern="^\w+[\w\.-]+@(\w+\.)+\w+">
                <p class="popup__error">Неправильный формат email</p>
                <p class="popup__input-title">Пароль</p>
                <input type="password" name="input__two" class="popup__input" placeholder="Введите пароль" required pattern="([a-z]+[A-Z]+[0-9]+|[a-z]+[0-9]+[A-Z]+|[A-Z]+[a-z]+[0-9]+|[A-Z]+[0-9]+[a-z]+|[0-9]+[a-z]+[A-Z]+|[0-9]+[A-Z]+[a-z]+)" minlength="8" maxlength="30">
                <p class="popup__error">asd</p>
                <p class="popup__input-title">Имя</p>
                <input type="password" name="input__two" class="popup__input" placeholder="Введите своё имя" required pattern="([а-яё]+(-[а-яё]+)?)|([a-z]+(-[a-z]+)?)" minlength="2" maxlength="30">
                <p class="popup__error">asd</p>
                <button class="button_big-oval popup__button popup__button_disabled" disabled="disabled">Зарегистрироваться</button>
                <p class="popup__switch">или
                  <a href="#" class="popup__link">Войти</a>
                </p>
            </form>
        </div>
      </div>
    `;
    const element = document.createElement('div');
    element.insertAdjacentHTML('beforeend', this.templatePopup.trim(''));
    return element.firstChild;
  }

  render() {
    this.popup = this.templateRegister();
    document.querySelector('.root').appendChild(this.popup);
    this.popup.querySelector('.popup__close').addEventListener('click', this.close);
  }

  close() {
    this.popup.remove();
  }
}
