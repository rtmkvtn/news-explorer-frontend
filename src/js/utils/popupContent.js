/* eslint-disable max-len */
const popupContent = {
  register: `
    <div class="popup__content">
      <div class="popup__close">
      <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="1.93934" y1="25.9393" x2="25.9393" y2="1.93934" stroke="white" stroke-width="3"/>
        <line x1="2.06066" y1="1.93934" x2="26.0607" y2="25.9393" stroke="white" stroke-width="3"/>
        </svg>
      </div>
      <h3 class="popup__title">Sign Up</h3>
      <form class="popup__form" name="form">
        <p class="popup__input-title">Email</p>
        <input type="email" name="email" class="popup__input" placeholder="Please enter your e-mail" required>
        <p class="popup__error"></p>
        <p class="popup__input-title">Password</p>
        <input type="password" name="password" autocomplete="current password" class="popup__input" placeholder="Please make up password" required minlength="8" maxlength="30">
        <p class="popup__error"></p>
        <p class="popup__input-title">Name</p>
        <input type="text" name="name" class="popup__input" placeholder="Please enter your name" required minlength="2" maxlength="30">
        <p class="popup__error submit__error"></p>
        <button class="button_big-oval popup__button popup__button_disabled" disabled="disabled">Create an account</button>
        <p class="popup__switch">or
          <a href="#" class="popup__link">Log In</a>
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
      <h3 class="popup__title">Log In</h3>
      <form class="popup__form" name="form">
        <p class="popup__input-title">Email</p>
        <input type="email" name="email" class="popup__input" placeholder="Please enter your e-mail" required>
        <p class="popup__error popup__error_displayed"></p>
        <p class="popup__input-title">Password</p>
        <input type="password" name="password" autocomplete="current password" class="popup__input" placeholder="Please enter password" required minlength="8" maxlength="30">
        <p class="popup__error submit__error"></p>
        <button class="button_big-oval popup__button popup__button_disabled" disabled="disabled">Log In</button>
        <p class="popup__switch">or
          <a href="#" class="popup__link">Create an account</a>
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
      <h3 class="popup__title popup__title_small">The user has been successfully registered!</h3>
      <a href="#" class="popup__link">Log In</a>
    </div>
  `,
  loader: `
    <div>
      <i class="circle-preloader"></i>
    </div>
  `,
};

export default popupContent;
