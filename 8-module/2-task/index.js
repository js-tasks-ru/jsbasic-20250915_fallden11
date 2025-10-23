import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.elem = this.render();
    this.renderProducts(this.products);
  }

  render() {
    const elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);

    this.inner = elem.querySelector(".products-grid__inner");
    return elem;
  }

  renderProducts(products) {
    this.inner.innerHTML = "";

    for (let product of products) {
      const card = new ProductCard(product);
      this.inner.append(card.elem);
    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    let filtered = this.products.filter((product) => {
      if (this.filters.noNuts && product.nuts) return false;

      if (this.filters.vegeterianOnly && !product.vegeterian) return false;

      if (
        this.filters.maxSpiciness !== undefined &&
        product.spiciness > this.filters.maxSpiciness
      ) {
        return false;
      }

      if (
        this.filters.category &&
        this.filters.category !== "" &&
        product.category !== this.filters.category
      ) {
        return false;
      }

      return true;
    });

    this.renderProducts(filtered);
  }
}
