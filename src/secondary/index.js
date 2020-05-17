import './index.css';
import MenuMobile from '../js/components/MenuMobile';
import Header from '../js/components/Header';
import NewsCardList from '../js/components/NewsCardList';
import ProfilePageTitle from '../js/components/ProfilePageTitle';
import SavedArticlesList from '../js/components/SavedArticlesList';

const header = new Header(null, '_black');

header.onLoadRender();

const profileTitleSection = document.querySelector('.profile');
const profileTitle = new ProfilePageTitle(profileTitleSection);
profileTitle.render();

const articlesSection = document.querySelector('.articles');
const userArticles = new SavedArticlesList(articlesSection);
userArticles.render();
