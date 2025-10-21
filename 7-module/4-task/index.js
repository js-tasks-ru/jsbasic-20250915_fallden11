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

    this.thumb.ondragstart = () => false;

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
    this.thumb.addEventListener("pointerdown", this.onPointerDown.bind(this));
  }

  onClick(event) {
    const left = event.clientX - this.elem.getBoundingClientRect().left;
    this.setValueByPosition(left);
    this.dispatchEvent();
  }

  onPointerDown(event) {
    event.preventDefault();
    this.elem.classList.add("slider_dragging");

    const onPointerMove = (e) => {
      e.preventDefault();
      let left = e.clientX - this.elem.getBoundingClientRect().left;

      if (left < 0) left = 0;
      if (left > this.elem.offsetWidth) left = this.elem.offsetWidth;

      const leftRelative = left / this.elem.offsetWidth;

      const leftPercents = leftRelative * 100;
      this.thumb.style.left = `${leftPercents}%`;
      this.progress.style.width = `${leftPercents}%`;
    };

    const onPointerUp = (e) => {
      let left = e.clientX - this.elem.getBoundingClientRect().left;

      if (left < 0) left = 0;
      if (left > this.elem.offsetWidth) left = this.elem.offsetWidth;

      const leftRelative = left / this.elem.offsetWidth;
      const segments = this.steps - 1;
      const value = Math.round(leftRelative * segments);
      this.value = value;

      const leftPercentsStep = (value / segments) * 100;
      this.thumb.style.left = `${leftPercentsStep}%`;
      this.progress.style.width = `${leftPercentsStep}%`;
      this.valueElem.textContent = value;

      [...this.stepsContainer.children].forEach((span, index) => {
        span.classList.toggle("slider__step-active", index === value);
      });

      this.elem.classList.remove("slider_dragging");

      this.dispatchEvent();

      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    };

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
  }

  setValueByPosition(left) {
    let leftRelative = left / this.elem.offsetWidth;
    if (leftRelative < 0) leftRelative = 0;
    if (leftRelative > 1) leftRelative = 1;

    const segments = this.steps - 1;
    const value = Math.round(leftRelative * segments);
    this.value = value;

    const leftPercents = (value / segments) * 100;
    this.thumb.style.left = `${leftPercents}%`;
    this.progress.style.width = `${leftPercents}%`;
    this.valueElem.textContent = value;

    [...this.stepsContainer.children].forEach((span, index) => {
      span.classList.toggle("slider__step-active", index === value);
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

  updateUI() {
    const segments = this.steps - 1;
    const leftPercents = (this.value / segments) * 100;

    this.thumb.style.left = `${leftPercents}%`;
    this.progress.style.width = `${leftPercents}%`;
    this.valueElem.textContent = this.value;

    [...this.stepsContainer.children].forEach((span, index) => {
      span.classList.toggle("slider__step-active", index === this.value);
    });
  }
}
