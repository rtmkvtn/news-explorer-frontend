import Form from './Form';

export default class FormSignin extends Form {
  constructor() {
    super();
    this._popupContext = null;
  }

  submit() {
    this._disableForm();
    this._buttonLoading();
    this.setServerError('');
    this._mainApi
      .signin(this._form.email.value, this._form.password.value)
      .then((res) => {
        if (res.message) {
          return Promise.reject(res.message);
        }
        localStorage.setItem('jwt', res.token);
        localStorage.setItem('tokenGoneAt', Date.now() + 7 * 24 * 60 * 60000);
        this._getInfo();
        return this._popupContext.close();
      })
      .catch((err) => this.setServerError(err))
      .finally(() => {
        this._clear();
        this._enableForm();
        this._buttonNormal();
      });
  }

  // Берет массив статей пользователя с сервера.
  // Записывает его в localStorage, так же записывает userName туда же
  _getInfo() {
    this._getArticlesFromStorage();
    this._mainApi
      .getArticles()
      .then((data) => {
        console.log(data);
        // в api кидается ошибка на все ответы с ошибкой, кроме 404, т.к. 404 означает,
        // что у пользователя пока что нет статей. 404 пропускаем
        if (!data.message) {
          const articles = data;
          this._addDataToUserArticles(articles);
          this._putArticlesToStorage();
        }
        this._mainApi
          .getUserData()
          .then((usr) => {
            if (usr.message) {
              return Promise.reject(usr.message);
            }
            const userName = usr.name.substring(0, 1).toUpperCase() + usr.name.substring(1);
            localStorage.setItem('userName', userName);
            return (window.location.href = './index.html');
          })
          .catch((err) => {
            throw new Error(err);
          });
      })
      .catch((err) => alert(`Произошла ошибка на сервере: ${err}`));
  }
}
