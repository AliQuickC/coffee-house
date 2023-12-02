(function () {
	const burgerButton = document.getElementById('burger-button');
	const burgerMenu = document.getElementById('burger-menu');

	burgerMenu.onclick = (event) => {
		if (event.target.closest('.burger-menu__item-link')) {
			burgerButton.classList.remove('burger-button_active');
			offBurgerMenu();
		}
		console.log('event.currentTarget: ', event.target);
	};

	burgerButton.onclick = (event) => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		event.currentTarget.classList.toggle('burger-button_active');
		if (event.currentTarget.classList.contains('burger-button_active')) {
			onBurgerMenu();
		} else {
			offBurgerMenu();
		}
	};

	function offBurgerMenu() {
		burgerMenu.classList.remove('burger-menu_active');
		document.body.classList.remove('scroll-block');
		document.documentElement.classList.remove('scroll-block');
	}

	function onBurgerMenu() {
		burgerMenu.classList.add('burger-menu_active');
		document.body.classList.add('scroll-block');
		document.documentElement.classList.add('scroll-block');
	}
})();
