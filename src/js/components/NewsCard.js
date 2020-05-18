/* eslint-disable indent */
import BaseComponent from './BaseComponent';
import dateFormatOptions from '../utils/dateFormatOptions';
import defaultPics from '../utils/defaultPics';
import MainAPI from '../api/MainApi';

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
    this._image = cardObj.article.urlToImage ? cardObj.article.urlToImage : 'http://no-image.com/pic.jpg';
    this._dateForApi = cardObj.article.publishedAt;
    this._date = dateFormat(cardObj.article.publishedAt, 'dd mmmm, yyyy');

    this._template = null;
  }

  render() {
    this._template = `
      <article class="cards-container__card card">
        <div class="card__image" style="background-image: url(${this._image}), 
        url(${defaultPics[Math.floor(Math.random() * defaultPics.length)]})">
          <button class="card__button-templ button_small-square"></button>
          <div class="card__button-hover-banner button-hover-banner">
            <p class="button-hover-banner__text">Войдите, чтобы сохранять статьи</p>
          </div>
        </div>
        <p class="card__date">${this._date}</p>
        <h3 class="card__title">${this._title}</h3>
        <p class="card__text">${this._description}</p>
        <a href="${this._url}" target="_blank" class="card__link">${this._source}</a>
      </article>
    `;
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

  _templClickHandler() {
    if (this._icon.classList.contains('_clicked')) {
      this._getArticlesFromStorage();
      const cardId = this._userArticles.find((el) => el.title === this._title)._id;
      this._api()
        .removeArticle(cardId)
        .then((res) => {
          console.log(res);
          const indexForRemove = this._userArticles.findIndex((el) => el._id === cardId);
          console.log(indexForRemove);
          this._userArticles.splice(indexForRemove, 1);
          this._icon.classList.remove('_clicked');
          this._putArticlesToStorage();
        });
    } else {
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
            console.log(resp.message);
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
        });
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
