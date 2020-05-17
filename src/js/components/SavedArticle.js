import BaseComponent from './BaseComponent';
import MainAPI from '../api/MainApi';
import dateFormatOptions from '../utils/dateFormatOptions';
import defaultPics from '../utils/defaultPics';
import ProfilePageTitle from './ProfilePageTitle';

const dateFormat = require('dateformat');

dateFormat.i18n = dateFormatOptions;

const mainApi = () => new MainAPI();

export default class SavedArticle extends BaseComponent {
  constructor(article) {
    super();
    this._id = article.article._id;
    this._api = mainApi;
    this._keyWord = article.article.keyword;
    this._source = article.article.source;
    this._title = article.article.title;
    this._description = article.article.text;
    this._url = article.article.link;
    this._image = article.article.image;
    this._date = dateFormat(article.article.date, 'dd mmmm, yyyy');
    this._card = null;
  }

  render() {
    this._template = `
    <article class="cards-container__card card">
      <div class="card__image" style="background-image: url(${this._image}), 
      url(${defaultPics[Math.floor(Math.random() * defaultPics.length)]})">
        <button class="card__button-delete button_small-square" title="Remove article"></button>
        <div class="card__key-word key-word">
          <p class="key-word__text">${this._keyWord}</p>
        </div>
        <div class="card__button-hover-banner button-hover-banner">
          <p class="button-hover-banner__text">Удалить из сохранённых</p>
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
    this._setListeners([
      {
        element: this._icon,
        event: 'click',
        callback: (evt) => this._removeClickHandler(evt),
      },
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
    return this._card;
  }

  _removeClickHandler() {
    this._getArticlesFromStorage();
    const cardId = this._userArticles.find((el) => el.title === this._title)._id;
    this._api()
      .removeArticle(cardId)
      .then((res) => {
        console.log(res);
        const indexForRemove = this._userArticles.findIndex((el) => el._id === cardId);
        this._userArticles.splice(indexForRemove, 1);
        this._removeFromDOM();
        this._putArticlesToStorage();
        document.location.href = '../secondary/index.html';
      });
  }

  _removeFromDOM() {
    this._clearListeners();
    console.log(this);
    this._card.remove();
  }

  _templHoverHandler(event, mouseAction) {
    if (mouseAction === 'over') {
      this._hoverBanner.classList.add('_is-displayed');
    } else {
      this._hoverBanner.classList.remove('_is-displayed');
    }
  }
}
