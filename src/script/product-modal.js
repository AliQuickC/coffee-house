export default function productModal() {
	const dialog = document.getElementById('dialog');
	const closeButton = document.getElementById('modal-close-button');

	const cardsWrapper = document.getElementById('products');

	const showDelay =	parseFloat(getComputedStyle(dialog).getPropertyValue('--modal-animation-delay')) * 1000;

  const modalWrap = dialog.querySelector('.product-modal__text-wrap');

  modalWrap.addEventListener('change', (event)=>{
    const sizePrice = Number.parseFloat(dialog.querySelector('.product-modal__size-field input[type=radio]:checked').value);
    let checkElementValues = [];
    dialog.querySelectorAll('.product-modal__additives-field input[type=checkbox]:checked')
    .forEach((item)=>{ checkElementValues.push(Number.parseFloat(item.value))});
    const additivesPrice = checkElementValues.reduce((summ, item)=> summ + item, 0);
    const priceOutElement = dialog.querySelector('.product-modal__price-value');

    const basePrice = Number.parseFloat(priceOutElement.getAttribute('data-base-price'));
    priceOutElement.value = "$" + (basePrice + sizePrice + additivesPrice).toFixed(2);
  });

	cardsWrapper.addEventListener('click', (event) => {
		const card = event.target.closest(`[data-category]`);
		if (card) {
			const sourceImg = card.querySelector('.product-card__img').getAttribute('src');
			const sourceName = card.querySelector('.product-card__name').textContent;
			const sourceDescription = card.querySelector('.product-card__description').textContent;
			const sourceBasePrice = card.querySelector('.product-card__price').textContent;
			dialog.querySelector('.product-modal__picture').setAttribute('src', sourceImg);
			dialog.querySelector('.product-modal__name').textContent = sourceName;
			dialog.querySelector('.product-modal__description').textContent =	sourceDescription;
      const priceOutElement = dialog.querySelector('.product-modal__price-value');
      priceOutElement.textContent =	sourceBasePrice;
      priceOutElement.setAttribute('data-base-price', sourceBasePrice.substring(1));


			dialog.querySelector('.product-modal__size-field input[type=radio]').checked = true;
			dialog.querySelectorAll('.product-modal__additives-field input[type=checkbox]:checked')
				.forEach(item=>item.checked = false);

			dialog.showModal();
			dialog.classList.add('open');
			document.body.classList.add('scroll-block');
		}
	});

	closeButton.onclick = () => {
		dialog.classList.remove('open');
		setTimeout(() => {
			dialog.close();
		}, showDelay);
		document.body.classList.remove('scroll-block');
	};

	dialog.onclick = (event) => {
		const dialogWindow = event.target.closest('.dialog__window');
		if (!dialogWindow) {
			dialog.classList.remove('open');
			setTimeout(() => {
				dialog.close();
			}, showDelay);
			document.body.classList.remove('scroll-block');
		}
	};
}
