import apiOptions from '../utils/ApiOptions';

export default class MainAPI {
  constructor() {
    this._baseURL = apiOptions.mainApi.baseUrl;
  }

  signup(email, password, name) {
    return fetch(`${this._baseURL}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    }).then((res) => res.json());
  }

  signin(email, password) {
    return fetch(`${this._baseURL}signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());
  }

  getUserData() {
    return fetch(`${this._baseURL}users/me`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res.json());
  }

  getArticles() {
    return fetch(`${this._baseURL}articles`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => {
      if (res.ok || res.status === 404) {
        return res.json();
      }
      throw new Error(`${res.status}: ${res.message}`);
    });
  }

  createArticle(keyword, title, text, date, source, link, image) {
    return fetch(`${this._baseURL}articles`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      }),
    }).then((res) => res.json());
  }

  removeArticle(id) {
    return fetch(`${this._baseURL}articles/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
    // {
    //   if (res.ok) {
    //     return res.json();
    //   }
    //   return res.json().then((err) => err);
    // })
    // .catch((err) => {
    //   const resErr = err;
    //   resErr.message = 'Произошла ощибка на сервере, попробуйте снова позже';
    //   return err;
    // });
  }
}
