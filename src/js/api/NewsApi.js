import BaseComponent from '../components/BaseComponent';

export default class NewsApi extends BaseComponent {
  constructor() {
    super();
    this._baseUrl = 'http://newsapi.org/v2/everything';
    this._apiKey = 'ff22a4b7d005462cb601b64239d9b157';
    this._date = new Date();
    this._reqUrl = null;
  }

  _reqUrlFormer(keyWord) {
    this._reqUrl = `${this._baseUrl}?q=${keyWord}&from=${this._date.setDate(
      this._date.getDate() - 7,
    )}&language=ru&to=${this._date}&pageSize=100`;
  }

  getNews(keyWord) {
    this._reqUrlFormer(keyWord);
    console.log(this._reqUrl);

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
      .catch((err) => console.log(err));
  }
}
