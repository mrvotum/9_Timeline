/* eslint-disable max-len */
import ValidateForm from './ValidateForm';
import CreatePost from './createPost';

export default class Geoposition {
  constructor(parent, text, media, mediaData) {
    this.mediaData = mediaData;
    this.tasksHolder = parent;
    this.positionByUser = null;
    this.positionByGeo = null;
    this.postText = text;
    this.media = media;
  }

  create() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.positionByGeo = `[${latitude.toFixed(5)}, ${longitude.toFixed(5)}]`;
          console.log('нет ошибок');
          const createPost = new CreatePost(this.tasksHolder, this.positionByGeo, this.postText, this.media, this.mediaData);
          createPost.create();
        }, () => {
          this.addErrorMessage();
          console.log('да, есть ошибка');
        },
      );
    }
  }

  addErrorMessage() {
    const errorEl = document.createElement('form');
    errorEl.className = 'formError';
    errorEl.setAttribute('data-id', 'formError');
    errorEl.innerHTML = `<p>Что-то пошло не так</p>
      <p>К сожалению, нам не удалось определить ваше местоположение, пожалуйста, дайте разрешение на использование геолокации, либо введите координаты вручную.</p>
      <p>Широта и долгота через запятую</p>
      <input data-id="describeField" class="describeField" type="text">
      <div class="formBtnHolder">
        <input data-id="btnResetError" class="btn" value="Отмена" type="reset">
        <input data-id="btnSubmitError" class="btn" value="Ok" type="submit">
      </div>`;

    this.tasksHolder.appendChild(errorEl);
    const formField = document.querySelector('[data-id=describeField]');
    // event.preventDefault();
    formField.focus();

    this.addErrorListener(formField);
  }

  addErrorListener(field) {
    field.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        const form = document.querySelector('[data-id=formError]');
        const checkForm = new ValidateForm(form);
        checkForm.create();
      }
    });

    const btnResetError = document.querySelector('[data-id=btnResetError]');
    const btnSubmitError = document.querySelector('[data-id=btnSubmitError]');

    btnSubmitError.addEventListener('click', (event) => {
      event.preventDefault();
      const form = document.querySelector('[data-id=formError]');
      const checkForm = new ValidateForm(form);
      if (checkForm.create()) {
        this.field = document.querySelector('[data-id=describeField]');
        // геопозиция, которую ввёл пользователь
        this.positionByUser = this.field.value;
        form.remove();

        const createPost = new CreatePost(this.tasksHolder, this.positionByUser, this.postText, this.media, this.mediaData);
        createPost.create();
      }
    });

    btnResetError.addEventListener('click', (event) => {
      event.preventDefault();
      const form = document.querySelector('[data-id=formError]');
      form.remove();
    });
  }
}
