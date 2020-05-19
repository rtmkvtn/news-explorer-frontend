const cardsTemplates = {
  cardFromNewsApi: (image, altImage, date, title, text, url, source) => `
    <article class="cards-container__card card">
      <div class="card__image" style="background-image: url(${image}), 
        url(${altImage})">
        <button class="card__button-templ button_small-square"></button>
        <div class="card__button-hover-banner button-hover-banner">
         <p class="button-hover-banner__text">Войдите, чтобы сохранять статьи</p>
        </div>
      </div>
      <p class="card__date">${date}</p>
      <h3 class="card__title">${title}</h3>
      <p class="card__text">${text}</p>
      <a href="${url}" target="_blank" class="card__link">${source}</a>
    </article>
  `,
  cardSaved: (image, altImage, keyWord, date, title, text, url, source) => `
    <article class="cards-container__card card">
      <div class="card__image" style="background-image: url(${image}), 
        url(${altImage})">
        <button class="card__button-delete button_small-square" title="Remove article"></button>
        <div class="card__key-word key-word">
          <p class="key-word__text">${keyWord}</p>
        </div>
      <div class="card__button-hover-banner button-hover-banner">
      <p class="button-hover-banner__text">Удалить из сохранённых</p>
      </div>
      </div>
      <p class="card__date">${date}</p>
      <h3 class="card__title">${title}</h3>
      <p class="card__text">${text}</p>
      <a href="${url}" target="_blank" class="card__link">${source}</a>
    </article>
  `,
};

export default cardsTemplates;
