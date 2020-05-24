/* eslint-disable indent */
import BaseComponent from './BaseComponent';
import defaultPics from '../utils/defaultPics';
import cardsTemplates from '../utils/cardsTemplates';
import serverErrors from '../constants/serverErrors';

export default class NewsCard extends BaseComponent {
  constructor(cardObj, keyWord, mainApi) {
    super();
    this._api = mainApi;

    this._keyWord = keyWord;
    this._card = null;
    this._source = cardObj.article.source.name ? cardObj.article.source.name : 'No source';
    this._title = cardObj.article.title;
    this._description = cardObj.article.description ? cardObj.article.description : 'No content';
    this._url = cardObj.article.url;
    // Если картинки нет, ставится битая ссылка, чтобы api не ругался на ввод без ссылки
    // далее в карточке будет альтернативный бэкграунд, в любом случае
    this._image = cardObj.article.urlToImage ? cardObj.article.urlToImage : 'http://no-image.com/pic.jpg';
    this._dateForApi = cardObj.article.publishedAt;
    this._date = new Date(Date.parse(cardObj.article.publishedAt));

    this._template = null;
  }

  render() {
    this._template = cardsTemplates.cardFromNewsApi(
      this._image,
      defaultPics[Math.floor(Math.random() * defaultPics.length)],
      this._date.toLocaleString('en', { day: 'numeric', month: 'long', year: 'numeric' }),
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
    this._api
      .removeArticle(cardId)
      .then((res) => {
        const resp = res;
        // Надо на бэке переписать отправку ответов, чтобы статусКод добавлял ко всем
        // Пока так, через проверку сообщения проверка.
        if (resp.message && !resp.message.includes('удалён')) {
          throw new Error(res.message);
        }
        const indexForRemove = this._userArticles.findIndex((el) => el._id === cardId);
        this._userArticles.splice(indexForRemove, 1);
        this._icon.classList.remove('_clicked');
        this._putArticlesToStorage();
      })
      .catch((err) => {
        this._icon.classList.remove('_clicked');
        alert(`${serverErrors.DEFAULT_ENG} Текст ошибки: ${err}`);
      });
  }

  _addArticle() {
    this._api
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
        if (res.message) {
          throw new Error(res.message);
        }
        this._icon.classList.add('_clicked');
        this._putNewCardToStorage(res);
      })
      .catch((err) => alert(`${serverErrors.DEFAULT_ENG} Текст ошибки: ${err}`));
  }

  _putNewCardToStorage(card) {
    const objForStorage = {};
    objForStorage._id = card._id;
    objForStorage.title = card.title;
    objForStorage.keyword = card.keyword;
    objForStorage.date = card.date;
    objForStorage.image = card.image;
    objForStorage.link = card.link;
    objForStorage.text = card.text;
    objForStorage.source = card.source;

    this._getArticlesFromStorage();
    this._userArticles.push(objForStorage);
    this._putArticlesToStorage();
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
