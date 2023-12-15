export default function () {
	const burgerButton = document.getElementById('burger-button');
	const burgerMenu = document.getElementById('burger-menu');
  // const menuLink = burgerMenu.querySelector('.burger-menu__link-menu');

  window.addEventListener("resize", ()=>{
    if(window.innerWidth > 768 && burgerButton.classList.contains('burger-button_active')) {
      offBurgerMenu();
    }
  });

	burgerMenu.onclick = (event) => {
		if (event.target.closest('.burger-menu__item-link')) {
      event.preventDefault();

      if(event.target.classList.contains('burger-menu__link-menu') && document.body.classList.contains("home-page")) {
        setTimeout(()=>{window.location.href = 'menu.html';}, 400);
      } else {
        setTimeout(()=>{window.location.href = event.target.href;}, 400);
      }

			burgerButton.classList.remove('burger-button_active');
			offBurgerMenu();
		}
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
    burgerButton.classList.remove('burger-button_active')
		document.body.classList.remove('scroll-block');
		document.documentElement.classList.remove('scroll-block');
	}

	function onBurgerMenu() {
		burgerMenu.classList.add('burger-menu_active');
		document.body.classList.add('scroll-block');
		document.documentElement.classList.add('scroll-block');
	}
};
