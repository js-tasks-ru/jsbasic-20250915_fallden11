export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = document.createElement("div");
    this.elem.className = "slider";

    this.thumb = document.createElement("div");
    this.thumb.className = "slider__thumb";
    this.valueElem = document.createElement("span");
    this.valueElem.className = "slider__value";
    this.valueElem.textContent = this.value;
    this.thumb.append(this.valueElem);
    this.elem.append(this.thumb);

    this.progress = document.createElement("div");
    this.progress.className = "slider__progress";
    this.elem.append(this.progress);

    this.stepsContainer = document.createElement("div");
    this.stepsContainer.className = "slider__steps";

    for (let i = 0; i < steps; i++) {
      let span = document.createElement("span");
      if (i === value) span.classList.add("slider__step-active");
      this.stepsContainer.append(span);
    }

    this.elem.append(this.stepsContainer);

    this.updateUI();

    this.elem.addEventListener("click", this.onClick.bind(this));
  }

  onClick(event) {
    const left = event.clientX - this.elem.getBoundingClientRect().left;
    const leftRelative = left / this.elem.offsetWidth;
    const segments = this.steps - 1;
    const approximateValue = leftRelative * segments;
    this.value = Math.round(approximateValue);

    this.updateUI();
    this.dispatchEvent();
  }

  updateUI() {
    const segments = this.steps - 1;
    const valuePercents = (this.value / segments) * 100;

    this.thumb.style.left = `${valuePercents}%`;
    this.progress.style.width = `${valuePercents}%`;

    this.valueElem.textContent = this.value;

    [...this.stepsContainer.children].forEach((span, index) => {
      span.classList.toggle("slider__step-active", index === this.value);
    });
  }

  dispatchEvent() {
    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      })
    );
  }
}
