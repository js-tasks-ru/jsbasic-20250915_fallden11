import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlide = 0;
    this.elem = this.#render();
    this.#initializationCarousel();
    this.#clickElement();
  }

  #render() {
    const slideElements = this.slides
      .map(
        (slide) => `
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${
          slide.image
        }" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `
      )
      .join("");

    const carousel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left" style="display: none">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${slideElements}
        </div>
      </div>
    `);

    return carousel;
  }

  #updateArrows() {
    this.arrowLeft.style.display = this.currentSlide === 0 ? "none" : "";
    this.arrowRight.style.display =
      this.currentSlide === this.slides.length - 1 ? "none" : "";
  }

  #updateSlide() {
    const offset = -this.carouselInner.offsetWidth * this.currentSlide;
    this.carouselInner.style.transform = `translateX(${offset}px)`;
    this.#updateArrows();
  }

  #initializationCarousel() {
    this.carouselInner = this.elem.querySelector(".carousel__inner");
    this.arrowRight = this.elem.querySelector(".carousel__arrow_right");
    this.arrowLeft = this.elem.querySelector(".carousel__arrow_left");
    this.arrowRight.addEventListener("click", () => {
      this.currentSlide++;
      this.#updateSlide();
    });

    this.arrowLeft.addEventListener("click", () => {
      this.currentSlide--;
      this.#updateSlide();
    });

    this.#updateArrows();
  }

  #clickElement() {
    this.elem.addEventListener("click", (event) => {
      const button = event.target.closest(".carousel__button");
      if (!button) return;

      const slide = event.target.closest(".carousel__slide");
      const id = slide.dataset.id;

      const productAdd = new CustomEvent("product-add", {
        detail: id,
        bubbles: true,
      });

      this.elem.dispatchEvent(productAdd);
    });
  }
}
