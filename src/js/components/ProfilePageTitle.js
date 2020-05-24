import BaseComponent from './BaseComponent';
import sanitizeHTML from '../utils/sanitizer';

// очень хардкодно вышел класс. То ли русский язык такой удобный, то ли я глупый.
// Нужно пересмотреть потом
export default class ProfilePageTitle extends BaseComponent {
  constructor(titleSection) {
    super();
    this._section = titleSection;
    this._title = titleSection.querySelector('.profile__title');
    this._words = titleSection.querySelector('.profile__key-words');
    this._titleTempl = null;
    this._wordsTempl = null;
    this._numOfArticles = 0;
    this._keywords = [];
  }

  render() {
    this._getKeywordsArr();
    this._renderTitleEng();
    this._renderWordsEng();
  }

  // Сортирует ключевые слова по популярности
  _getKeywordsArr() {
    this._getArticlesFromStorage();
    this._numOfArticles = this._userArticles.length;
    const unsortedWords = [];
    this._userArticles.forEach((art) => {
      if (!unsortedWords.includes(art.keyword)) {
        unsortedWords.push(art.keyword);
      }
    });

    const sortedWords = [];
    unsortedWords.forEach((el) => {
      const wordQuant = this._userArticles.filter((article) => article.keyword === el);
      sortedWords.push({ title: el, quant: wordQuant.length });
    });
    const keywordsForDom = [];
    sortedWords.sort((a, b) => b.quant - a.quant);
    sortedWords.forEach((el) => keywordsForDom.push(el.title));
    this._keywords = keywordsForDom;
    this._putArticlesToStorage();
  }

  // рендерит блок с количеством keyword, в зависимости от их количества
  _renderWords() {
    this._words.textContent = 'По ключевым словам: ';
    if (this._numOfArticles === 0) {
      this._words.textContent = '';
      this._wordsTempl = '';
    } else if (this._keywords.length === 1) {
      const wordOne = this._makeContentForDOM(`<span>${sanitizeHTML(this._keywords[0])}.</span>`);
      this._words.appendChild(wordOne);
    } else if (this._keywords.length === 2) {
      const wordOne = this._makeContentForDOM(`<span>${sanitizeHTML(this._keywords[0])}, </span>`);
      const wordTwo = this._makeContentForDOM(`<span>${sanitizeHTML(this._keywords[1])}.</span>`);
      this._words.appendChild(wordOne);
      this._words.appendChild(wordTwo);
    } else if (this._keywords.length === 3) {
      const wordOne = this._makeContentForDOM(`<span>${sanitizeHTML(this._keywords[0])}, </span>`);
      const wordTwo = this._makeContentForDOM(`<span>${sanitizeHTML(this._keywords[1])}, </span>`);
      const wordThree = this._makeContentForDOM(`<span>${sanitizeHTML(this._keywords[2])}.</span>`);
      this._words.appendChild(wordOne);
      this._words.appendChild(wordTwo);
      this._words.appendChild(wordThree);
    } else if (this._keywords.length === 4) {
      const wordOne = this._makeContentForDOM(`<span>${sanitizeHTML(this._keywords[0])}, </span>`);
      const wordTwo = this._makeContentForDOM(`<span>${sanitizeHTML(this._keywords[1])}, </span>`);
      const wordsOthers = this._makeContentForDOM('<span>и 1 другому.</span>');
      this._words.appendChild(wordOne);
      this._words.appendChild(wordTwo);
      this._words.appendChild(wordsOthers);
    } else {
      const wordOne = this._makeContentForDOM(`<span>${sanitizeHTML(this._keywords[0])}, </span>`);
      const wordTwo = this._makeContentForDOM(`<span>${sanitizeHTML(this._keywords[1])}, </span>`);
      const wordsOthers = this._makeContentForDOM(`<span>и ${sanitizeHTML(this._keywords.length - 2)} другим.</span>`);
      this._words.appendChild(wordOne);
      this._words.appendChild(wordTwo);
      this._words.appendChild(wordsOthers);
    }
  }

  // рендерит блок с количеством статей, в зависимости от их количества
  _renderTitle() {
    if (this._numOfArticles === 0) {
      this._titleTempl = `${sanitizeHTML(localStorage.userName)}, у вас пока нет сохраненных статей.`;
    } else if (
      this._numOfArticles.toString()[this._numOfArticles.toString().length - 1] === '1' &&
      this._numOfArticles.toString()[this._numOfArticles.toString().length - 2] !== '1'
    ) {
      this._titleTempl = `${sanitizeHTML(localStorage.userName)}, у вас ${this._numOfArticles} сохраненная статья.`;
    } else if (
      (this._numOfArticles.toString()[this._numOfArticles.toString().length - 1] === '2' ||
        this._numOfArticles.toString()[this._numOfArticles.toString().length - 1] === '3' ||
        this._numOfArticles.toString()[this._numOfArticles.toString().length - 1] === '4') &&
      this._numOfArticles.toString()[this._numOfArticles.toString().length - 2] !== '1'
    ) {
      this._titleTempl = `${sanitizeHTML(localStorage.userName)}, у вас ${this._numOfArticles} сохраненных статьи.`;
    } else {
      this._titleTempl = `${sanitizeHTML(localStorage.userName)}, у вас ${this._numOfArticles} сохраненных статей.`;
    }
    this._title.textContent = this._titleTempl;
  }

  _renderTitleEng() {
    if (this._numOfArticles === 0) {
      this._titleTempl = `${sanitizeHTML(localStorage.userName)}, you don't have any saved articles yet.`;
    } else if (this._numOfArticles === 1) {
      this._titleTempl = `${sanitizeHTML(localStorage.userName)}, you have 1 saved article.`;
    } else {
      this._titleTempl = `${sanitizeHTML(localStorage.userName)}, you have ${this._numOfArticles} saved articles.`;
    }
    this._title.textContent = this._titleTempl;
  }

  _renderWordsEng() {
    this._words.textContent = 'According to the keywords: ';
    if (this._numOfArticles === 0) {
      this._words.textContent = '';
      this._wordsTempl = '';
    } else if (this._keywords.length === 1) {
      const wordOne = this._makeContentForDOM(`<span>${sanitizeHTML(this._keywords[0])}.</span>`);
      this._words.appendChild(wordOne);
    } else if (this._keywords.length === 2) {
      const wordOne = this._makeContentForDOM(`<span>${sanitizeHTML(this._keywords[0])}, </span>`);
      const wordTwo = this._makeContentForDOM(`<span>${sanitizeHTML(this._keywords[1])}.</span>`);
      this._words.appendChild(wordOne);
      this._words.appendChild(wordTwo);
    } else if (this._keywords.length === 3) {
      const wordOne = this._makeContentForDOM(`<span>${sanitizeHTML(this._keywords[0])}, </span>`);
      const wordTwo = this._makeContentForDOM(`<span>${sanitizeHTML(this._keywords[1])}, </span>`);
      const wordThree = this._makeContentForDOM(`<span>${sanitizeHTML(this._keywords[2])}.</span>`);
      this._words.appendChild(wordOne);
      this._words.appendChild(wordTwo);
      this._words.appendChild(wordThree);
    } else {
      const wordOne = this._makeContentForDOM(`<span>${sanitizeHTML(this._keywords[0])}, </span>`);
      const wordTwo = this._makeContentForDOM(`<span>${sanitizeHTML(this._keywords[1])}, </span>`);
      const wordsOthers = this._makeContentForDOM(`<span>and ${sanitizeHTML(this._keywords.length - 2)} more.</span>`);
      this._words.appendChild(wordOne);
      this._words.appendChild(wordTwo);
      this._words.appendChild(wordsOthers);
    }
  }
}
