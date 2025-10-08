function initCarousel() {
  const carousel = document.querySelector(".carousel");
  const carouselInner = carousel.querySelector(".carousel__inner");
  const arrowLeft = carousel.querySelector(".carousel__arrow_left");
  const arrowRight = carousel.querySelector(".carousel__arrow_right");
  const slideWidth = carouselInner.offsetWidth;
  let currentSlide = 0;
  const totalSlides = 4;

  arrowLeft.style.display = "none";

  arrowRight.addEventListener("click", () => {
    currentSlide++;
    updateCarousel();
  });

  arrowLeft.addEventListener("click", () => {
    currentSlide--;
    updateCarousel();
  });

  function updateCarousel() {
    const offset = -slideWidth * currentSlide;
    carouselInner.style.transform = `translateX(${offset}px)`;
    if (currentSlide === 0) {
      arrowLeft.style.display = "none";
    } else {
      arrowLeft.style.display = "";
    }

    if (currentSlide === totalSlides - 1) {
      arrowRight.style.display = "none";
    } else {
      arrowRight.style.display = "";
    }
  }
}
