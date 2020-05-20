import NewsCardList from './NewsCardList';
import SavedArticle from './SavedArticle';

const card = ({ article }, mainApi) => new SavedArticle({ article }, mainApi);

export default class SavedArticlesList extends NewsCardList {
  constructor(section, mainApi) {
    super();
    this._api = mainApi;
    this._section = section;
    this._card = card;
    this._cardList = [];
  }

  render() {
    this._container = this._makeContentForDOM(this._resultsTemplates.articlesContainer);
    this._section.appendChild(this._container);

    this._getArticlesFromStorage();
    this._userArticles.forEach((article) => {
      this._container.appendChild(this._card({ article }, this._api).render());
    });
  }
}
