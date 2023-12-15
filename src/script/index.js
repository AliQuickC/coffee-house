import '../sass/index.sass';
import burgerMenu from './burger-menu';
import carouselSlider from './carousel';
import getData from './getdata';
import renderCard from './render-card';
import cardFilter from './card-filter';
import productModal from './product-modal';


const isHomePage = document.body.classList.contains("home-page");
const isMenuPage = document.body.classList.contains("menu-page");

burgerMenu();

if(isHomePage) {
  carouselSlider();
} else if(isMenuPage) {
  const productsDB = await getData();
  renderCard(productsDB);
  cardFilter();
  productModal();
}
