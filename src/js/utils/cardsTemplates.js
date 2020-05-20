import sanitizeHTML from './sanitizer';

const cardsTemplates = {
  cardFromNewsApi: (image, altImage, date, title, text, url, source) => `
    <article class="cards-container__card card">
      <div class="card__image" style="background-image: url(${sanitizeHTML(image)}), 
        url(${sanitizeHTML(altImage)})">
        <button class="card__button-templ button_small-square"></button>
        <div class="card__button-hover-banner button-hover-banner">
         <p class="button-hover-banner__text">Войдите, чтобы сохранять статьи</p>
        </div>
      </div>
      <p class="card__date">${sanitizeHTML(date)}</p>
      <h3 class="card__title">${sanitizeHTML(title)}</h3>
      <p class="card__text">${sanitizeHTML(text)}</p>
      <a href="${sanitizeHTML(url)}" target="_blank" class="card__link">${sanitizeHTML(source)}</a>
    </article>
  `,
  cardSaved: (image, altImage, keyWord, date, title, text, url, source) => `
    <article class="cards-container__card card">
      <div class="card__image" style="background-image: url(${sanitizeHTML(image)}), 
        url(.${sanitizeHTML(altImage)})">
        <button class="card__button-delete button_small-square" title="Remove article"></button>
        <div class="card__key-word key-word">
          <p class="key-word__text">${sanitizeHTML(keyWord)}</p>
        </div>
      <div class="card__button-hover-banner button-hover-banner">
      <p class="button-hover-banner__text">Удалить из сохранённых</p>
      </div>
      </div>
      <p class="card__date">${sanitizeHTML(date)}</p>
      <h3 class="card__title">${sanitizeHTML(title)}</h3>
      <p class="card__text">${sanitizeHTML(text)}</p>
      <a href="${sanitizeHTML(url)}" target="_blank" class="card__link">${sanitizeHTML(source)}</a>
    </article>
  `,
};

export default cardsTemplates;
