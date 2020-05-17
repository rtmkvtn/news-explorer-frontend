import validErrorsRu from '../constants/validErrors';

export default class Validator {
  // getting right error-message element for check
  getErrorElement() {
    const errorrString = document.querySelectorAll('.popup__error');
    for (let i = 0; i < errorrString.length; i++) {
      if (errorrString[i].previousElementSibling === event.target) {
        return errorrString[i];
      }
    }
  }

  validate(type, event) {
    if (type === 'text') {
      this.textFormValidator(event);
    } else if (type === 'email') {
      this.emailFormValidator(event);
    } else if (type === 'password') {
      this.passwordFormValidator(event);
    } else if (type === 'url') {
      this.urlFormValidator(event);
    }
  }

  // take right error message from errors obj and put it into the error field
  stringValid(errorString) {
    errorString.textContent = validErrorsRu.STRING_VALID;
  }

  stringNothing(errorString) {
    errorString.textContent = validErrorsRu.STRING_NO_EXIST;
  }

  stringBadLength(errorString) {
    errorString.textContent = validErrorsRu.STRING_LENGTH;
  }

  linkInvalid(errorString) {
    errorString.textContent = validErrorsRu.LINK_NOT_LINK;
  }

  emailInvalid(errorrString) {
    errorrString.textContent = validErrorsRu.EMAIL_NOT_EMAIL;
  }

  passwordBadLength(errorrString) {
    errorrString.textContent = validErrorsRu.PASSWORD_LEHGTH;
  }

  // validator func for text input
  textFormValidator(event) {
    const input = event.target;
    const errorrStringEvent = this.getErrorElement(event);
    if (input.validity.valid) {
      this.stringValid(errorrStringEvent);
    } else if (input.value.length === 0) {
      this.stringNothing(errorrStringEvent);
    } else if (input.value.length < 2 || input.value.length > 30) {
      this.stringBadLength(errorrStringEvent);
    }
  }

  // validator func for link input
  urlFormValidator(event) {
    const input = event.target;
    const errorrStringEvent = this.getErrorElement(event);
    if (input.validity.valid) {
      this.stringValid(errorrStringEvent);
    } else {
      this.linkInvalid(errorrStringEvent);
    }
  }

  passwordFormValidator(event) {
    const input = event.target;
    const errorrStringEvent = this.getErrorElement(event);
    if (input.validity.valid) {
      this.stringValid(errorrStringEvent);
    } else {
      this.passwordBadLength(errorrStringEvent);
    }
  }

  emailFormValidator(event) {
    const input = event.target;
    const errorrStringEvent = this.getErrorElement(event);
    if (input.validity.valid) {
      this.stringValid(errorrStringEvent);
    } else {
      this.emailInvalid(errorrStringEvent);
    }
  }
}
