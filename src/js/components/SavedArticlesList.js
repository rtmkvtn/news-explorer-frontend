import NewsCardList from './NewsCardList';
import SavedArticle from './SavedArticle';

const card = ({ article }) => new SavedArticle({ article });

export default class SavedArticlesList extends NewsCardList {
  constructor(section) {
    super();
    this._section = section;
    this._card = card;
    this._cardList = [];
  }

  render() {
    this._container = this._makeContentForDOM(this._resultsTemplates.articlesContainer);
    this._section.appendChild(this._container);

    this._getArticlesFromStorage();
    this._userArticles.forEach((article) => {
      this._container.appendChild(this._card({ article }).render());
    });
  }
}
