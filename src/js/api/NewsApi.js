import apiOptions from '../utils/ApiOptions';

export default class NewsApi {
  constructor() {
    this._baseUrl = apiOptions.newsApi.baseURL;
    this._apiKey = apiOptions.newsApi.token;
    this._dateFrom = new Date(Date.now() - 7 * 24 * 60 * 60000).toISOString();
    this._dateTo = new Date(Date.now()).toISOString();
    this._reqUrl = null;
  }

  _reqUrlFormer(keyWord) {
    console.log(this._dateFrom);
    console.log(this._dateTo);
    this._reqUrl = `${this._baseUrl}?q=${keyWord}&from=${this._dateFrom}&language=ru&to=${this._dateTo}&pageSize=100`;
  }

  getNews(keyWord) {
    this._reqUrlFormer(keyWord);

    return fetch(`${this._reqUrl}`, {
      headers: {
        'X-Api-Key': this._apiKey,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((err) => err);
      })
      .catch((err) => {
        const resErr = err;
        resErr.message = 'Произошла ошибка на сервере, попробуйте снова позже';
        return err;
      });
  }
}
