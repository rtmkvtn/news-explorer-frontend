/* eslint-disable no-underscore-dangle */
export default class BaseComponent {
  constructor() {
    this._listeners = [];
    this._userArticles = null;
  }

  // Достает массив пользовательских статей из localStorage
  _getArticlesFromStorage() {
    this._userArticles = JSON.parse(localStorage.userArticles);
  }

  // Кладет массив пользовательских статей в localStorage
  _putArticlesToStorage() {
    localStorage.setItem('userArticles', JSON.stringify(this._userArticles));
  }

  // наполняет массив пользовательских статей
  _addDataToUserArticles(articles) {
    articles.forEach((el) => {
      const obj = {};
      obj._id = el._id;
      obj.title = el.title;
      obj.keyword = el.keyword;
      obj.date = el.date;
      obj.image = el.image;
      obj.link = el.link;
      obj.text = el.text;
      obj.source = el.source;

      this._userArticles.push(obj);
    });
  }

  _setListeners(listeners) {
    listeners.forEach((listener) => {
      this._addListener(listener.element, listener.event, listener.callback);
    });
  }

  _addListener(element, event, callback) {
    element.addEventListener(event, callback);
    this._listeners.push({ element, event, callback });
  }

  _clearListeners() {
    this._listeners.forEach(({ element, event, callback }) => {
      element.removeEventListener(event, callback);
    });
  }

  // Возвращает DOM элемент из строки темплейта
  _makeContentForDOM(templ) {
    const element = document.createElement('div');
    element.insertAdjacentHTML('beforeend', templ.trim(''));
    return element.firstChild;
  }
}
