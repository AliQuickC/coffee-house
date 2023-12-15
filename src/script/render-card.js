export default function renderCard(data){
  let cardsLayout = '';
  const cardsWrapper = document.getElementById('products');
  cardsWrapper.innerHTML = '';

  const basePath = '../assets/menu-section/products';
  data.forEach(card => {
    cardsLayout += `<div class="menu__product-card product-card ${card.category !== 'coffee' ? 'product-card_hide' : ''}" data-category="${card.category}">
    <div class="product-card__picture">
      <img src="${basePath}/${card.category}/${card.picture}.jpg" alt="product card" class="product-card__img">
    </div>
      <div class="product-card__text-wrap">
        <h5 class="product-card__name">${card.name}</h5>
        <p class="product-card__description">${card.description}</p>
        <span class="product-card__price">$${card.price}</span>
      </div>
  </div>`;
  });
  cardsWrapper.innerHTML = cardsLayout;
};