/* eslint-disable indent */
import BaseComponent from './BaseComponent';
import dateFormatOptions from '../utils/dateFormatOptions';
import defaultPics from '../utils/defaultPics';
import MainAPI from '../api/MainApi';
import cardsTemplates from '../utils/cardsTemplates';

const dateFormat = require('dateformat');

dateFormat.i18n = dateFormatOptions;

const mainApi = () => new MainAPI();

export default class NewsCard extends BaseComponent {
  constructor(cardObj, keyWord) {
    super();
    this._api = mainApi;

    this._keyWord = keyWord;
    this._card = null;
    this._source = cardObj.article.source.name ? cardObj.article.source.name : 'Источник не указан';
    this._title = cardObj.article.title;
    this._description = cardObj.article.description ? cardObj.article.description : 'Нет текста';
    this._url = cardObj.article.url;
    // Если картинки нет, ставится битая ссылка, чтобы api не ругался на ввод без ссылки
    // далее в карточке будет альтернативный бэкграунд, в любом случае
    this._image = cardObj.article.urlToImage ? cardObj.article.urlToImage : 'http://no-image.com/pic.jpg';
    this._dateForApi = cardObj.article.publishedAt;
    this._date = dateFormat(cardObj.article.publishedAt, 'dd mmmm, yyyy');

    this._template = null;
  }

  render() {
    this._template = cardsTemplates.cardFromNewsApi(
      this._image,
      defaultPics[Math.floor(Math.random() * defaultPics.length)],
      this._date,
      this._title,
      this._description,
      this._url,
      this._source,
    );
    this._card = this._makeContentForDOM(this._template);
    this._icon = this._card.querySelector('.button_small-square');
    this._hoverBanner = this._card.querySelector('.card__button-hover-banner');

    if (localStorage.getItem('jwt')) {
      this._setLoggedListeners();
      if (this._checkArticle()) {
        this._icon.classList.add('_clicked');
      }
    } else {
      this._addUnloggedListeners();
    }

    return this._card;
  }

  _setLoggedListeners() {
    this._setListeners([
      {
        element: this._icon,
        event: 'click',
        callback: (evt) => this._templClickHandler(evt),
      },
    ]);
  }

  _removeArticle() {
    this._getArticlesFromStorage();
    const cardId = this._userArticles.find((el) => el.title === this._title)._id;
    this._api()
      .removeArticle(cardId)
      .then((res) => {
        if (res.ok) {
          const indexForRemove = this._userArticles.findIndex((el) => el._id === cardId);
          this._userArticles.splice(indexForRemove, 1);
          this._icon.classList.remove('_clicked');
          this._putArticlesToStorage();
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => alert(err));
  }

  _addArticle() {
    this._api()
      .createArticle(
        this._keyWord.toLowerCase(),
        this._title,
        this._description,
        this._dateForApi,
        this._source,
        this._url,
        this._image,
      )
      .then((res) => {
        const resp = res;
        if (resp.message) {
          throw new Error(resp.message);
        } else {
          this._icon.classList.add('_clicked');
          const objForStorage = {};
          objForStorage._id = resp._id;
          objForStorage.title = resp.title;
          objForStorage.keyword = resp.keyword;
          objForStorage.date = resp.date;
          objForStorage.image = resp.image;
          objForStorage.link = resp.link;
          objForStorage.text = resp.text;
          objForStorage.source = resp.source;

          this._getArticlesFromStorage();
          this._userArticles.push(objForStorage);
          this._putArticlesToStorage();
        }
      })
      .catch((err) => alert(err));
  }

  _templClickHandler() {
    if (this._icon.classList.contains('_clicked')) {
      this._removeArticle();
    } else {
      this._addArticle();
    }
  }

  _addUnloggedListeners() {
    this._setListeners([
      {
        element: this._icon,
        event: 'mouseover',
        callback: (evt) => this._templHoverHandler(evt, 'over'),
      },
      {
        element: this._icon,
        event: 'mouseout',
        callback: (evt) => this._templHoverHandler(evt, 'out'),
      },
    ]);
  }

  // Проверка, есть ли статья в сохраненных пользователем из localStorage
  _checkArticle() {
    this._getArticlesFromStorage();
    const exist = this._userArticles.find((art) => art.title === this._title);
    this._putArticlesToStorage();
    return exist;
  }

  _templHoverHandler(event, mouseAction) {
    if (mouseAction === 'over') {
      this._hoverBanner.classList.add('_is-displayed');
    } else {
      this._hoverBanner.classList.remove('_is-displayed');
    }
  }
}
