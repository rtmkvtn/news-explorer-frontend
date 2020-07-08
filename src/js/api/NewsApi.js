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
    this._reqUrl = `${this._baseUrl}?q=${keyWord}&from=${this._dateFrom}&to=${this._dateTo}&pageSize=100&apiKey=${this._apiKey}`;
  }

  getNews(keyWord) {
    this._reqUrlFormer(keyWord);

    return fetch(`${this._reqUrl}`, {
      headers: {},
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        if (res.status === 426) {
          alert(
            `An error has occured on the newsApi side. Unfortunately, I can not do anything with it at the moment. Hope, they will fix it soon. Meanwhile you can check all other functions of this app except news search.`,
          );
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
