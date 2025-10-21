import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this._render();

    this._onKeyDown = this._onKeyDown.bind(this);
    this._onCloseClick = this._onCloseClick.bind(this);
  }

  _render() {
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
              
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);

    this.modalTitle = this.elem.querySelector(".modal__title");
    this.modalBody = this.elem.querySelector(".modal__body");
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add("is-modal-open");

    this.closeButton = this.elem.querySelector(".modal__close");
    this.closeButton.addEventListener("click", this._onCloseClick);

    document.addEventListener("keydown", this._onKeyDown);
  }

  close() {
    this.elem.remove();
    document.body.classList.remove("is-modal-open");

    document.removeEventListener("keydown", this._onKeyDown);
  }

  setTitle(title) {
    this.modalTitle.textContent = title;
  }

  setBody(node) {
    this.modalBody.innerHTML = "";
    this.modalBody.append(node);
  }

  _onCloseClick() {
    this.close();
  }

  _onKeyDown(event) {
    if (event.code === "Escape") {
      this.close();
    }
  }
}
