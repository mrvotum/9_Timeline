import RecTimer from './RecTimer';
import Geoposition from './Geoposition';

export default class VideoRec {
  constructor(parent, mic, cam) {
    this.tasksHolder = parent;
    this.mic = mic;
    this.cam = cam;
  }

  create() {
    this.field = document.querySelector('[data-id=textarea]');
    this.taskAddForm = document.querySelector('[data-id=taskAddForm]');
    this.field.style.width = '350px';

    this.btnHolderEl = document.createElement('div');
    this.btnHolderEl.innerHTML = `<button data-id="done" style="width: 30px; height: 30px" class="btn">V</button>
    <span data-id="timeRec">00:00</span>
    <button data-id="reset" style="width: 30px; height: 30px" class="btn">X</button>`;

    this.taskAddForm.appendChild(this.btnHolderEl);

    this.recordVideo(this.btnHolderEl);
  }

  recordVideo(btnHolderEl) {
    this.btnHolderEl = btnHolderEl;
    this.timeRec = document.querySelector('[data-id=timeRec]');
    const timerRec = new RecTimer(this.timeRec);

    (async () => {
      if (!navigator.mediaDevices) {
        return;
      }
      try {
        const video = document.createElement('video');
        video.setAttribute('data-id', 'video');
        video.controls = true;
        video.className = 'videoSmall';

        this.textarea = document.querySelector('[data-id=textarea]');
        this.textarea.style.display = 'none';


        // textarea. appendChild(video);
        this.taskAddForm.insertBefore(video, this.textarea);

        if (!window.MediaRecorder) {
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

        const recorder = new MediaRecorder(stream);

        const chunks = [];
        recorder.addEventListener('start', () => {
          console.log('recording started');
          timerRec.start();
        });

        recorder.addEventListener('dataavailable', (evt) => {
          console.log('data available');
          chunks.push(evt.data);
        });

        recorder.addEventListener('stop', () => {
          console.log('recording stopped');
          const blob = new Blob(chunks);
          video.src = URL.createObjectURL(blob);
        });
        recorder.start();


        this.btnDone = document.querySelector('[data-id=done]');
        this.btnReset = document.querySelector('[data-id=reset]');

        // галочка согласие
        this.btnDone.addEventListener('click', (event) => {
          event.preventDefault();
          this.mic.style.transform = 'translateX(0)';
          this.cam.style.transform = 'translateX(0)';
          this.field.style.width = '90%';

          recorder.stop();
          stream.getTracks().forEach(track => track.stop());
          timerRec.stop();

          const postText = this.textarea.value;

          video.className = 'video';

          const geoposition = new Geoposition(this.tasksHolder, postText, 'cam', video);
          geoposition.create();

          this.btnHolderEl.remove();
          video.remove();
          this.textarea.style.display = 'block';
        });

        // отменить запись и удалить
        this.btnReset.addEventListener('click', (event) => {
          event.preventDefault();
          this.mic.style.transform = 'translateX(0)';
          this.cam.style.transform = 'translateX(0)';
          this.field.style.width = '90%';

          recorder.stop();
          stream.getTracks().forEach(track => track.stop());
          timerRec.stop();

          this.btnHolderEl.remove();
          video.remove();
          this.textarea.style.width = '90%';
          this.textarea.style.display = 'block';
        });
      } catch (e) {
        console.error(e);
        const video = document.querySelector('[data-id=video]');
        video.remove();
        this.textarea.style.width = '90%';
        this.textarea.style.display = 'block';
        this.drowError(this.btnHolderEl);
      }
    })();
  }

  drowError(btnHolderEl) {
    this.btnHolderEl = btnHolderEl;
    this.mic.style.transform = 'translateX(0)';
    this.cam.style.transform = 'translateX(0)';
    this.field.style.width = '90%';
    this.btnHolderEl.remove();

    const errorEl = document.createElement('form');
    errorEl.className = 'formError';
    errorEl.setAttribute('data-id', 'formError');
    errorEl.innerHTML = `<p>Что-то пошло не так</p>
      <p>К сожалению, нам не удалось.</p>
      <p>Возможно нет прав доступа к камере</p>
      <div class="formBtnHolder">
        <input data-id="btnResetError" class="btn" value="ок" type="reset">
      </div>`;

    this.tasksHolder.appendChild(errorEl);

    this.addErrorListener();
  }

  addErrorListener() {
    const btnResetError = document.querySelector('[data-id=btnResetError]');
    btnResetError.addEventListener('click', (event) => {
      event.preventDefault();
      const form = document.querySelector('[data-id=formError]');
      form.remove();
    });
  }
}
