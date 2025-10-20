import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
    this.initEvents();
  }

  render() {
    const elem = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner"></nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    const inner = elem.querySelector(".ribbon__inner");
    inner.innerHTML = this.categories
      .map(
        (cat) =>
          `<a href="#" class="ribbon__item" data-id="${cat.id}">${cat.name}</a>`
      )
      .join("");

    inner.firstElementChild.classList.add("ribbon__item_active");

    return elem;
  }

  initEvents() {
    const inner = this.elem.querySelector(".ribbon__inner");
    const arrowRight = this.elem.querySelector(".ribbon__arrow_right");
    const arrowLeft = this.elem.querySelector(".ribbon__arrow_left");

    arrowRight.addEventListener("click", () => inner.scrollBy(350, 0));
    arrowLeft.addEventListener("click", () => inner.scrollBy(-350, 0));

    inner.addEventListener("scroll", () => {
      let scrollLeft = inner.scrollLeft;
      let scrollRight = inner.scrollWidth - scrollLeft - inner.clientWidth;

      arrowLeft.classList.toggle("ribbon__arrow_visible", scrollLeft > 0);
      arrowRight.classList.toggle("ribbon__arrow_visible", scrollRight > 1);
    });

    inner.addEventListener("click", (event) => {
      const item = event.target.closest(".ribbon__item");
      if (!item) return;
      event.preventDefault();

      inner
        .querySelector(".ribbon__item_active")
        ?.classList.remove("ribbon__item_active");
      item.classList.add("ribbon__item_active");

      const id = item.dataset.id;
      this.elem.dispatchEvent(
        new CustomEvent("ribbon-select", {
          detail: id,
          bubbles: true,
        })
      );
    });
  }
}
