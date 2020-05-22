import './index.css';
import Header from '../js/components/Header';
import ProfilePageTitle from '../js/components/ProfilePageTitle';
import SavedArticlesList from '../js/components/SavedArticlesList';
import MainAPI from '../js/api/MainApi';

const header = new Header(null, '_black');

header.onLoadRender();

const profileTitleSection = document.querySelector('.profile');
const profileTitle = new ProfilePageTitle(profileTitleSection);
profileTitle.render();

const articlesSection = document.querySelector('.articles');
const userArticles = new SavedArticlesList(articlesSection, new MainAPI());
userArticles.render();

export default profileTitle;
