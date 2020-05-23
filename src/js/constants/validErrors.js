const validErrorsRu = {
  STRING_LENGTH: 'Должно быть от 2 до 30 символов',
  STRING_NO_EXIST: 'Это обязательное поле',
  STRING_VALID: '',
  LINK_NOT_LINK: 'Здесь должна быть ссылка',
  EMAIL_NOT_EMAIL: 'Здесь должен быть email адрес',
  PASSWORD_SHORT: 'Минимальная длина пароля - 8 символов',
  PASSWORD_LONG: 'Максимальная длина пароля - 30 символов',
};

const validErrorsEng = {
  STRING_LENGTH: 'Must be 2 to 30 symbols',
  STRING_NO_EXIST: 'This field is required',
  STRING_VALID: '',
  LINK_NOT_LINK: 'Must be a link',
  EMAIL_NOT_EMAIL: 'Must be an email address',
  PASSWORD_SHORT: 'Minimum length for the password - 8 symbols',
  PASSWORD_LONG: 'Maximum length for the password - 30 symbols',
};

module.exports = {
  validErrorsRu,
  validErrorsEng,
};
