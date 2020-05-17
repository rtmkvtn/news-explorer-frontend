import BaseComponent from './BaseComponent';

export default class MainForm extends BaseComponent {
  constructor(someApi, form, resultsClass) {
    super();
    this._form = form;
    this._input = this._form.keyWord;
    this._button = document.querySelector('.form__button');
    this._api = someApi;
    this._results = resultsClass;
    this._validateInputElement = this._validateInputElement.bind(this);
  }

  setFormListeners() {
    this._setListeners([
      {
        element: this._input,
        event: 'input',
        callback: this._validateInputElement,
      },
      {
        element: this._button,
        event: 'click',
        callback: (evt) => this._submitHandler(),
      },
    ]);
  }

  setServerError() {}

  _clear() {
    this._input.value = '';
  }

  _submitHandler(event) {
    this._results.clear();
    this._disableForm();
    event.preventDefault();
    this._results.renderLoader();
    this._api.getNews(this._input.value).then((res) => {
      console.log(res);
      this._results.clear();
      if (res.totalResults === 0) {
        this._results.renderNothingFound();
        this._enableForm();
      } else {
        this._results.renderResults(res.articles, this._input.value);
      }
      this._clear();
      this._enableForm();
    });
  }

  _validateInputElement() {
    console.log(this);
    if (!this._input.validity.valid) {
      this._input.setCustomValidity('Введите слово для поиска');
      this._disableForm();
    } else {
      this._input.setCustomValidity('');
      this._enableForm();
    }
  }

  _enableForm() {
    this._button.removeAttribute('disabled');
  }

  _disableForm() {
    this._button.setAttribute('disabled', true);
  }

  _getInfo() {}
}
