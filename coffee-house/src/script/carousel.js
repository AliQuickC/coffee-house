export default function () {
  const FIRST_SLIDE = 1;
  const nextSlideTime = 5000;
  const PROGRESS_INTERVAL = nextSlideTime / 100;
  let blockToSwichSlide = false;
  const slideSwitchTime = 500;
  let currentSlideNumber = 1;

  const slider = document.querySelector('.favorite-slider');
  const prevBtn = document.querySelector('.favorite-slider__button-prev');
  const nextBtn = document.querySelector('.favorite-slider__button-next');
  const slidesContainer = document.querySelector('#slides-container');
  const sliderFrame = document.querySelector('.favorite-slider__frame');
  let width = getComputedStyle(slider).getPropertyValue('--card-width');

  window.addEventListener("resize", (event) => {
    width = getComputedStyle(slider).getPropertyValue('--card-width');
    slidesContainer.style.left = Number.parseInt(width) * -1 * currentSlideNumber + 'px';
  })

  class progressManage {
    constructor(selector) {
      this._sliderProgress = document.querySelectorAll(`${selector} > *`);
      this._currentProgressItemNumber = 1;
      this._currentProgressElement = this._sliderProgress[this._currentProgressItemNumber - 1];
    }

    setProgressValue(value) {
      this._currentProgressElement.value = value;
    }

    clearAllProgressElements() {
      this._sliderProgress.forEach((item)=>{
        item.value = 0;
      });
    }

    setProgressItem(value) {
      this._currentProgressItemNumber = value;
      this._currentProgressElement = this._sliderProgress[this._currentProgressItemNumber - 1];
    }
  }

  class sliderTimer {
    static PROGRESS_0_PPESCENT = 0;
    static PROGRESS_100_PPESCENT = 100;

    constructor() {
      this._nextSlideProgress = sliderTimer.PROGRESS_0_PPESCENT; // 0-100 %
      this._timeId;
      this._progress = new progressManage('.favorite-slider__progress');
    }

    getSlideProgress() {
      return this._nextSlideProgress;
    }

    startTimer(slideNumber, callback) {
      clearInterval(this._timeId);

      this._progress.setProgressItem(slideNumber);

      this._timeId = setInterval(() => {
        this._nextSlideProgress += 1;
        this._progress.setProgressValue(this._nextSlideProgress);
        if(this._nextSlideProgress === sliderTimer.PROGRESS_100_PPESCENT) {
          callback();
        }
      }, PROGRESS_INTERVAL);
    }

    pauseTimer() {
      clearInterval(this._timeId);
    }

    stopTimer() {
      clearInterval(this._timeId);
      this._nextSlideProgress = sliderTimer.PROGRESS_0_PPESCENT;
      this._progress.clearAllProgressElements();
    }
  }

	addFirstAndLastSlides('#slides-container');
  slidesContainer.style.left = Number.parseInt(width) * -1 * FIRST_SLIDE + 'px';
  setTimeout(()=>{
    slidesContainer.style.WebkitTransition = `left ${slideSwitchTime}ms`;
    slidesContainer.style.transition =`left ${slideSwitchTime}ms`; // enable container animation with all slides
  }, 0)

  const onMouseDown = (event) => {
    if (event.type !== "touchstart" || event.target.closest('[data-outside]')) return;
    timer.pauseTimer();

    const frameXPos = event.currentTarget.getBoundingClientRect().left;
    const frameWidth = event.currentTarget.getBoundingClientRect().width;
    const startTouch = event.changedTouches['0'].pageX - frameXPos;
    const startSlidePos = parseInt(slidesContainer.style.left)
    slidesContainer.style.WebkitTransition = "none";
    slidesContainer.style.transition = "none";

    const slideFinish = (event) => {
      let endTouch = event.changedTouches['0'].pageX - frameXPos;
      event.currentTarget.removeEventListener("touchmove", slideMove);
      event.currentTarget.removeEventListener("touchend", slideFinish);

      if (endTouch < 0) endTouch = 0;
			if (endTouch > frameWidth) endTouch = frameWidth;

      const difference = endTouch - startTouch

			if (difference < -150) {
				moveNext();
			} else if (difference > 150) {
				movePrev();
			} else {
        slidesContainer.style.WebkitTransition = `left ${slideSwitchTime}ms`;
        slidesContainer.style.transition =`left ${slideSwitchTime}ms`; // enable container animation with all slides
        slidesContainer.style.left = Number.parseInt(width) * -1 * currentSlideNumber + 'px';
        timer.startTimer(currentSlideNumber, moveNext);
			}
    }

    const slideMove = (event) => {
      let endTouch = event.changedTouches["0"].pageX - frameXPos;
      if (endTouch < 0) endTouch = 0;
			if (endTouch > frameWidth) endTouch = frameWidth;
      slidesContainer.style.left = startSlidePos - startTouch + endTouch + 'px'; // startTouch
    }

    event.currentTarget.addEventListener("touchmove", slideMove);
    event.currentTarget.addEventListener("touchend", slideFinish);
		event.currentTarget.addEventListener("touchleave", slideFinish);
  };

  const timer = new sliderTimer();
  prevBtn.onclick = movePrev;
  nextBtn.onclick = moveNext;

  sliderFrame.addEventListener('touchstart', onMouseDown);

  timer.startTimer(currentSlideNumber, moveNext);

  sliderFrame.onmouseover = (event) => {
    timer.pauseTimer();
  };

  sliderFrame.onmouseout = (event) => {
    if (event.relatedTarget && event.relatedTarget.closest('.favorite-slider__frame')) { return; }
    timer.startTimer(currentSlideNumber, moveNext);
  };

  function moveNext() {
    if(blockToSwichSlide) return;
    blockToSwichSlide = true;

    timer.stopTimer();

    slidesContainer.style.WebkitTransition = `left ${slideSwitchTime}ms`;
    slidesContainer.style.transition = `left ${slideSwitchTime}ms`; // enable container animation with all slides
    currentSlideNumber += 1;
    slidesContainer.style.left = Number.parseInt(width) * -1 * currentSlideNumber + 'px';

    if(currentSlideNumber === 4) {
      currentSlideNumber = 1;
      setTimeout(()=>{
        slidesContainer.style.transition = "none";
        slidesContainer.style.left = Number.parseInt(width) * -1 * currentSlideNumber + 'px';
        timer.startTimer(currentSlideNumber, moveNext);
        blockToSwichSlide = false;
      }, slideSwitchTime)
    } else {
      timer.startTimer(currentSlideNumber, moveNext);
      blockToSwichSlide = false;
    }
  }

  function movePrev() {
    if(blockToSwichSlide) return;
    blockToSwichSlide = true;

    timer.stopTimer();

    slidesContainer.style.WebkitTransition = `left ${slideSwitchTime}ms`;
    slidesContainer.style.transition =`left ${slideSwitchTime}ms`; // enable container animation with all slides
    currentSlideNumber -= 1;
    slidesContainer.style.left = Number.parseInt(width) * -1 * currentSlideNumber + 'px';

    if(currentSlideNumber === 0) {
      currentSlideNumber = 3;
      setTimeout(()=>{
        slidesContainer.style.transition = "none";
        slidesContainer.style.left = Number.parseInt(width) * -1 * currentSlideNumber + 'px';
        timer.startTimer(currentSlideNumber, moveNext);
        blockToSwichSlide = false;
      }, slideSwitchTime)
    } else {
      timer.startTimer(currentSlideNumber, moveNext);
      blockToSwichSlide = false;
    }
  }

	function addFirstAndLastSlides(slector) {
		const slidesContainer = document.querySelector(slector);
		const firstSlide = slidesContainer.querySelector(
			slector + ' > *:first-child'
		);
		const lastSlide = slidesContainer.querySelector(
			slector + ' > *:last-child'
		);

		let firstDup = firstSlide.cloneNode(true);
    firstDup.dataset.outside = 'first';
		let lastDup = lastSlide.cloneNode(true);
    lastDup.dataset.outside = 'last';

		lastSlide.insertAdjacentElement('afterend', firstDup);
		firstSlide.insertAdjacentElement('beforebegin', lastDup);
	}
};
