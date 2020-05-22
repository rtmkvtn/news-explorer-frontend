import BaseComponent from './BaseComponent';

export default class MainForm extends BaseComponent {
  constructor(someApi, form, resultsClass) {
    super();
    this._form = form;
    this._input = this._form.keyWord;
    this._button = document.querySelector('.form__button');
    this._api = someApi;
    this._results = resultsClass;
  }

  setFormListeners() {
    this._setListeners([
      {
        element: this._input,
        event: 'input',
        callback: (evt) => this._handleInput(evt),
      },
      {
        element: this._input,
        event: 'invalid',
        callback: (evt) => this._handleInvalid(evt),
      },
      {
        element: this._button,
        event: 'click',
        callback: (evt) => this._submitHandler(evt),
      },
    ]);
  }

  _clear() {
    this._input.value = '';
  }

  _submitHandler(event) {
    this._results.clear();
    this._disableForm();
    event.preventDefault();
    this._results.renderLoader();
    this._api
      .getNews(this._input.value)
      .then((res) => {
        this._results.clear();
        if (res.totalResults === 0) {
          this._results.renderNothingFound();
          return;
        }
        if (res.status === 'ok') {
          this._results.renderResults(res.articles, this._input.value);
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => this._setServerError(err))
      .finally(() => this._enableForm());
  }

  _setServerError(err) {
    this._results.renderError(err);
  }

  _handleInvalid() {
    this._disableForm();

    this._input.setCustomValidity('Введите ключевое слово для поиска');
  }

  _handleInput() {
    this._input.setCustomValidity('');
    this._input.reportValidity();
    if (this._input.validity.valid) {
      this._enableForm();
    }
  }

  _enableForm() {
    this._button.removeAttribute('disabled');
  }

  _disableForm() {
    this._button.setAttribute('disabled', true);
  }
}
