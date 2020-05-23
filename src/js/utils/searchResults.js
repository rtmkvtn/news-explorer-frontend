/* eslint-disable max-len */
const searchResults = {
  resultsTitle: `
    <h2 class="results__title section__title">Search results</h2>
  `,
  resultsContainer: `
    <div class="results__container cards-container"></div>
  `,
  articlesContainer: `
  <div class="articles__container cards-container"></div>
  `,
  loader: `
    <div class="root__section search-loading">
      <i class="circle-preloader"></i>
      <h3 class="search-loading__title">Looking for the news...</h3>
    </div>
  `,
  nothisngFound: `
    <div class="root__section nothing-found">
      <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" class="nothing-found__image">
        <circle cx="43" cy="43" r="36.5" stroke="#D1D2D6"/>
        <path d="M69 69L88.5 88.5" stroke="#D1D2D6"/>
        <path d="M58.3283 55.959C54.6606 51.6979 49.2275 48.9998 43.1642 48.9998C37.1009 48.9998 31.6678 51.6979 28 55.959" stroke="#D1D2D6"/>
        <circle cx="55.5" cy="33.5" r="1.5" fill="#D1D2D6"/>
        <circle cx="30.5" cy="33.5" r="1.5" fill="#D1D2D6"/>
      </svg>
      <h2 class="nothing-found__title">No results</h2>
      <p class="nothing-found__text">Sorry, nothing was found.</p>
    </div>
  `,
  showMoreButton: `
    <button class="results__more-results-button button_big-oval" title="More results">More</button>
  `,
  serverError: `
  <div class="root__section nothing-found serverError">
    <h2 class="nothing-found__title serverError__title">An error has occurred!</h2>
    <p class="nothing-found__text">Please, try again later.</p>
  </div>
  `,
};

export default searchResults;
