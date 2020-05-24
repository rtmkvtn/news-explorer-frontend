# News-Explorer

## v 1.1.0

## [Link to the Site](https://newsxyz.xyz 'News-Explorer')

Front end part of the final project for yandex.Praktikum courses.

This project aimed to search news articles on the web using third-party API by requests with key-words on news topics with ability to save those, which are in user's interests area, as a templated articles in user's profile page.

At the moment includes such features as:

- Responsive design
- webpack feautures:
  - optimizing of pictures and fonts by file-loader and image-webpack-loader
  - CSS is optimized and minimized
  - JS transformed to ES5 from ES6
  - CSS and JS files hashing is set up
- Interacting with self-made (https://github.com/fckXYZ/new-explorer-api "back-end API"), which will provide:
  - Registering of new users
  - Logging-in for registered users into their own profile page
  - Saving and removing news articles templates using user's profile page
  - All routes in details you can check on (https://github.com/fckXYZ/new-explorer-api "back-end API") github repo page
  - Searching news articles by keywords using (https://newsapi.org/ "newsApi")
- All the front-end logic on vanilla pure JS
- JS made on ES-6 modules

Future features:

- Add ability to chose region of search
- Add languages:
  - RU
  - DE mb
  - ZH mb

## Installing

1. Clone repo:

```
git clone https://github.com/fckXYZ/news-explorer-frontend.git
cd news-explorer-frontend
```

2. Install dependencies:

```
npm install
```

3. Choose build:

- `npm run dev` - run development server with hot-reload enabled.
- `npm run build` - make production build in /dist.
