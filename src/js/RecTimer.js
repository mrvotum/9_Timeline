export default class RecTimer {
  constructor(parent) {
    this.parent = parent;
    this.min = 0;
    this.sec = 0;
  }

  start() {
    console.info(this.parent.textContent);

    this.kek = setInterval(() => {
      this.sec += 1;

      this.parent.textContent = `${this.check(this.min)}:${this.check(this.sec)}`;
    }, 1000);
  }

  stop() {
    clearTimeout(this.kek);
  }

  check(elem) {
    if (elem < 10) {
      return `0${elem}`;
    // eslint-disable-next-line no-else-return
    } else if (elem >= 59) {
      this.sec = 0;
      this.min += 1;
      return `${elem}`;
    }
    return elem;
  }
}