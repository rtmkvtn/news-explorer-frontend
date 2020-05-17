/* eslint-disable class-methods-use-this */
import BaseComponent from './BaseComponent';
import NewsCard from './NewsCard';
import searchResults from '../utils/searchResults';
import MainAPI from '../api/MainApi';

const card = ({ article }, keyWord) => new NewsCard({ article }, keyWord);
const api = () => new MainAPI();

export default class NewsCardList extends BaseComponent {
  constructor(section) {
    super();
    this._section = section;
    this._resultsTemplates = searchResults;
    this._card = card;
    this._maniApi = api;
  }

  clear() {
    this._clearListeners();
    this._section.innerHTML = '';
    this._section.classList.remove('_is-displayed');
  }

  renderResults(newsList, keyWord) {
    this._keyWord = keyWord;
    this._container = this._makeContentForDOM(this._resultsTemplates.resultsContainer);
    this._buttonMore = this._makeContentForDOM(this._resultsTemplates.showMoreButton);
    this._section.appendChild(this._makeContentForDOM(this._resultsTemplates.resultsTitle));
    this._section.appendChild(this._container);

    this._cardList = newsList;
    while (this._container.childNodes.length !== 3) {
      if (this._cardList.length === 0) {
        return;
      }
      this._renderOneCard(this._keyWord);
    }
    this._section.classList.add('_is-displayed');

    if (this._cardList.length > 0) {
      this._section.appendChild(this._buttonMore);
    }

    this._setListeners([
      {
        element: this._buttonMore,
        event: 'click',
        callback: (evt) => this._moreResults(evt),
      },
    ]);
  }

  _moreResults() {
    const stop = this._container.childNodes.length + 3;
    while (this._container.childNodes.length !== stop) {
      if (this._cardList.length === 0) {
        this._buttonMore.remove();
        return;
      }
      this._renderOneCard(this._keyWord);
    }
  }

  _renderOneCard(keyWord) {
    const article = this._cardList[0];
    const cardEl = this._card({ article }, keyWord).render();
    this._container.appendChild(cardEl);
    this._cardList.shift();
  }

  renderLoader() {
    this._loader = this._makeContentForDOM(this._resultsTemplates.loader);
    this._section.appendChild(this._loader);
    this._section.classList.add('_is-displayed');
  }

  renderNothingFound() {
    this._section.appendChild(this._makeContentForDOM(this._resultsTemplates.nothisngFound));
    this._section.classList.add('_is-displayed');
  }

  renderError() {}
}
