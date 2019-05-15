export default class ValidateForm {
  constructor(validateForm) {
    this.form = validateForm;
    this.field = document.querySelector('[data-id=describeField]');
  }

  create() {
    const isValid = this.form.checkValidity();

    if (!isValid) {
      const first = [...this.form.elements].find(o => !o.validity.valid);
      first.focus();

      if (first.validity.typeMismatch === false) {
        first.customError = 'Необходимо ввести данные';
      }

      const error = document.createElement('span');
      error.className = 'formError';
      error.setAttribute('data-id', 'formError');
      error.textContent = first.customError;
      first.offsetParent.appendChild(error);
      error.style.top = `calc(50% + ${first.offsetTop}px / 2)`;

      setTimeout(() => {
        error.remove();
      }, 1500);
    } else {
      return this.validateUsername(this.field.value);
    }
  }

  validateUsername(checkingName) {
    this.check = checkingName;
    // eslint-disable-next-line no-useless-escape
    if (this.check.search(/\[*\-*[0-9]+\.[0-9]+\,\s?\-*[0-9]+\.[0-9]+\]*/gm) !== 0) {
      this.field.focus();

      this.field.customError = 'Данные введены некорректно';

      const error = document.createElement('span');
      error.className = 'formError';
      error.setAttribute('data-id', 'formError');
      error.textContent = this.field.customError;
      this.field.offsetParent.appendChild(error);
      error.style.top = `calc(50% + ${this.field.offsetTop}px / 2)`;

      setTimeout(() => {
        error.remove();
      }, 1500);
    } else {
      return true;
    }
  }
}
