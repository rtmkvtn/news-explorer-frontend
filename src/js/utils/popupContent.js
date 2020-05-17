const popupContent = {
  register: `
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
        <input type="email" name="email" class="popup__input" placeholder="Введите почту" required>
        <p class="popup__error"></p>
        <p class="popup__input-title">Пароль</p>
        <input type="password" name="password" autocomplete="current password" class="popup__input" placeholder="Введите пароль" required minlength="8" maxlength="30">
        <p class="popup__error"></p>
        <p class="popup__input-title">Имя</p>
        <input type="text" name="name" class="popup__input" placeholder="Введите своё имя" required minlength="2" maxlength="30">
        <p class="popup__error submit__error"></p>
        <button class="button_big-oval popup__button popup__button_disabled" disabled="disabled">Зарегистрироваться</button>
        <p class="popup__switch">или
          <a href="#" class="popup__link">Войти</a>
        </p>
      </form>
    </div>
    `,
  login: `
    <div class="popup__content">
      <div class="popup__close">
        <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="1.93934" y1="25.9393" x2="25.9393" y2="1.93934" stroke="white" stroke-width="3"/>
          <line x1="2.06066" y1="1.93934" x2="26.0607" y2="25.9393" stroke="white" stroke-width="3"/>
        </svg>
      </div>
      <h3 class="popup__title">Вход</h3>
      <form class="popup__form" name="form">
        <p class="popup__input-title">Email</p>
        <input type="email" name="email" class="popup__input" placeholder="Введите почту" required>
        <p class="popup__error popup__error_displayed"></p>
        <p class="popup__input-title">Пароль</p>
        <input type="password" name="password" autocomplete="current password" class="popup__input" placeholder="Введите пароль" required minlength="8" maxlength="30">
        <p class="popup__error submit__error"></p>
        <button class="button_big-oval popup__button popup__button_disabled" disabled="disabled">Войти</button>
        <p class="popup__switch">или
          <a href="#" class="popup__link">Зарегистрироваться</a>
        </p>
      </form>
    </div>  
  `,
  successRegister: `
    <div class="popup__content popup__content_small">
      <div class="popup__close">
        <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="1.93934" y1="25.9393" x2="25.9393" y2="1.93934" stroke="white" stroke-width="3"/>
        <line x1="2.06066" y1="1.93934" x2="26.0607" y2="25.9393" stroke="white" stroke-width="3"/>
        </svg>
      </div>
      <h3 class="popup__title popup__title_small">Пользователь успешно зарегистрирован!</h3>
      <a href="#" class="popup__link">Выполнить вход</a>
    </div>
  `,
};

export default popupContent;
