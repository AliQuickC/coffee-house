export default function cardFilter(){
  const cardsWrapper = document.getElementById('products');
  const productCards = document.querySelectorAll('#products > *');
  const radioTabs = document.getElementById('radio-tabs');
  const refrefButton = document.getElementById('refresh-button');

  cardNumberFilter();
  refrefButton.addEventListener('click', ShowAllCardsInCategory);
  radioTabs.addEventListener('change', event => categoryFilter(event.target.value));
  window.addEventListener("resize", cardNumberFilter)

  function categoryFilter(category) {
    productCards.forEach((item)=>{
      item.getAttribute('data-category') === category ? item.classList.remove('product-card_hide') : item.classList.add('product-card_hide');
    });
    cardNumberFilter();
  }

  function ShowAllCardsInCategory() {
    const category = radioTabs.querySelector('input[type=radio]:checked').value;
    const selectCategoryCards = cardsWrapper.querySelectorAll(`[data-category="${category}"]`);
    refrefButton.classList.remove('menu__refresh-button_show');
    selectCategoryCards.forEach((item) => { item.classList.remove('product-card_hide') });
  }

  function cardNumberFilter() {
    const category = radioTabs.querySelector('input[type=radio]:checked').value;
    const selectCategoryCards = cardsWrapper.querySelectorAll(`[data-category="${category}"]`);

    if(window.innerWidth <= 768 && selectCategoryCards.length > 4) {
      refrefButton.classList.add('menu__refresh-button_show');
      selectCategoryCards.forEach((item, index) => {
        index < 4 ? item.classList.remove('product-card_hide') : item.classList.add('product-card_hide');
      });
    } else ShowAllCardsInCategory();
  }
}
