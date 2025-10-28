import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;

    let cartItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );

    if (cartItem) {
      cartItem.count++;
    } else {
      cartItem = {
        product: product,
        count: 1,
      };
      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find((item) => item.product.id === productId);

    if (!cartItem) {
      return;
    }

    cartItem.count += amount;

    if (cartItem.count === 0) {
      this.cartItems = this.cartItems.filter(
        (item) => item.product.id !== productId
      );
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item) => sum + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.count,
      0
    );
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");

    const modalBody = document.createElement("div");

    for (let { product, count } of this.cartItems) {
      const productElem = this.renderProduct(product, count);
      modalBody.append(productElem);
    }

    const orderForm = this.renderOrderForm();
    modalBody.append(orderForm);

    this.modal.setBody(modalBody);
    this.modal.open();

    modalBody.addEventListener("click", (event) => {
      const button = event.target.closest(".cart-counter__button");
      if (!button) return;

      const productElem = event.target.closest("[data-product-id]");
      const productId = productElem.dataset.productId;

      if (button.classList.contains("cart-counter__button_plus")) {
        this.updateProductCount(productId, 1);
      }

      if (button.classList.contains("cart-counter__button_minus")) {
        this.updateProductCount(productId, -1);
      }
    });

    orderForm.addEventListener("submit", (event) => this.onSubmit(event));

    this.modalBody = modalBody;
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    if (!document.body.classList.contains("is-modal-open")) {
      return;
    }

    if (this.isEmpty()) {
      this.modal.close();
      return;
    }

    const productId = cartItem.product.id;
    const modalBody = this.modalBody;

    const productElem = modalBody.querySelector(
      `[data-product-id="${productId}"]`
    );

    if (cartItem.count === 0 && productElem) {
      productElem.remove();
    }

    const productCountElem = modalBody.querySelector(
      `[data-product-id="${productId}"] .cart-counter__count`
    );
    const productPriceElem = modalBody.querySelector(
      `[data-product-id="${productId}"] .cart-product__price`
    );
    const totalPriceElem = modalBody.querySelector(`.cart-buttons__info-price`);

    if (productCountElem) {
      productCountElem.innerHTML = cartItem.count;
    }

    if (productPriceElem) {
      const productTotal = cartItem.product.price * cartItem.count;
      productPriceElem.innerHTML = `€${productTotal.toFixed(2)}`;
    }

    if (totalPriceElem) {
      totalPriceElem.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    }
  }

  async onSubmit(event) {
    event.preventDefault();

    const form = this.modalBody.querySelector(".cart-form");
    const submitButton = form.querySelector('[type="submit"]');

    submitButton.classList.add("is-loading");

    try {
      const formData = new FormData(form);

      const response = await fetch("https://httpbin.org/post", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        this.modal.setTitle("Success!");

        this.cartItems = [];

        this.modal.setBody(
          createElement(`
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>
      `)
        );

        this.cartIcon.update(this);
      }
    } catch (err) {
      console.error("Ошибка при оформлении заказа:", err);
    } finally {
      submitButton.classList.remove("is-loading");
    }
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
