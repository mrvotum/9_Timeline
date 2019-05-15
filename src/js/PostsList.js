import Geoposition from './Geoposition';
import AudioRec from './AudioRec';
import VideoRec from './VideoRec';

export default class PostsList {
  constructor(parent) {
    this.tasksHolder = parent; // div -> UL tag
  }

  create() {
    const listEl = document.createElement('ul');
    listEl.className = 'timelineHolder';
    listEl.setAttribute('data-id', 'timelineHolder');
    listEl.innerHTML = `<li class="taskHolder">
      <div class="task">
        <div class="post">
          <span class="description">Мои философские цитаты мыслителей иногда оказываются совсем не цитатами</span>
          <span class="taskGeopos">[51.12341, -19.31942]</span>
        </div>
        <div class="timeHolder">
          <span data-id="taskDate" class="taskDate">10.03.19 08:03</span>
        </div>
      </div>
    </li>


    <!-- УДАЛИТЬ УДАЛИТЬ УДАЛИТЬ УДАЛИТЬ УДАЛИТЬ -->
    <li class="taskHolder">
        <div class="task">
          <div class="post">
            <span class="description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis architecto mollitia nemo quis, voluptatum voluptas perspiciatis quas unde, a reprehenderit dolorem, eius molestiae sapiente laboriosam? Nisi explicabo autem ut voluptate?
              Voluptatibus fugit harum consectetur. Beatae delectus dolore explicabo eveniet. Ipsam mollitia atque a ratione tempore. Quia officia neque error, quaerat hic quisquam sint doloremque nobis repudiandae culpa quibusdam enim vel.
              Quas minus unde numquam iure beatae labore facere enim nam ipsa voluptatum eius repellat alias libero ab, aliquid vero. Soluta a reiciendis repudiandae blanditiis ea atque, eveniet corporis dignissimos quaerat.
            </span>
            <span class="taskGeopos">[51.12341, -19.31942]</span>
          </div>
          <div class="timeHolder">
            <span data-id="taskDate" class="taskDate">10.03.19 08:03</span>
          </div>
        </div>
      </li>
      <!-- УДАЛИТЬ УДАЛИТЬ УДАЛИТЬ УДАЛИТЬ УДАЛИТЬ -->`;

    this.tasksHolder.appendChild(listEl);
    this.addMenu(this.tasksHolder);
  }

  addMenu() {
    const listEl = document.createElement('li');
    listEl.className = 'taskAdd';
    listEl.setAttribute('data-id', 'taskAdd');
    listEl.innerHTML = `
      <form class="taskAddForm" data-id="taskAddForm">
      <textarea data-id="textarea" class="message"></textarea>
      <button data-id="mic" class="btn">
        <svg id="mic" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96.667 96.666">
        <path d="M48.333,73.296c9.519,0,17.263-7.744,17.263-17.262V17.262C65.596,7.743,57.852,0,48.333,0
          c-9.519,0-17.262,7.743-17.262,17.262v38.773C31.071,65.553,38.814,73.296,48.333,73.296z"/>
        <path d="M76.078,45.715h-3.437c-1.104,0-2,0.896-2,2v7.029c0,12.3-10.008,22.308-22.309,22.308S26.025,67.044,26.025,54.744
          v-7.029c0-1.104-0.896-2-2-2h-3.437c-1.104,0-2,0.896-2,2v7.029c0,14.707,11.433,27.667,26.026,29.506v4.98h-15.35
          c-1.104,0-2,0.896-2,2v3.436c0,1.104,0.896,2,2,2h38.138c1.104,0,2-0.896,2-2V91.23c0-1.104-0.896-2-2-2H52.051v-4.98
          c14.594-1.838,26.026-14.799,26.026-29.506v-7.029C78.078,46.61,77.182,45.715,76.078,45.715z"/>
        </svg>
      </button>
      <button data-id="cam" class="btn">
        <svg id="cam" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 459 459">
          <path d="M357,191.25V102c0-15.3-10.2-25.5-25.5-25.5h-306C10.2,76.5,0,86.7,0,102v255c0,15.3,10.2,25.5,25.5,25.5h306
          c15.3,0,25.5-10.2,25.5-25.5v-89.25l102,102V89.25L357,191.25z"/>
        </svg>
      </button>
    </form>`;

    const ulEl = this.tasksHolder.querySelector('[data-id=timelineHolder]');
    ulEl.appendChild(listEl);
    this.addBtnsListeners();
  }

  addBtnsListeners() {
    const textarea = document.querySelector('[data-id=textarea]');

    textarea.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        console.log('это был enter, значит создаём пост');

        const postText = textarea.value;

        const geoposition = new Geoposition(this.tasksHolder, postText);
        geoposition.create();
      }
    });

    this.mic = document.querySelector('[data-id=mic]');
    this.cam = document.querySelector('[data-id=cam]');

    mic.addEventListener('click', (event) => {
      event.preventDefault();
      this.mic.style.transform = 'translateX(100vw)';
      this.cam.style.transform = 'translateX(100vw)';
      const audioRec = new AudioRec(this.tasksHolder, this.mic, this.cam);
      audioRec.create();
      console.log('microphone');
    });

    cam.addEventListener('click', (event) => {
      event.preventDefault();
      this.mic.style.transform = 'translateX(100vw)';
      this.cam.style.transform = 'translateX(100vw)';
      const videoRec = new VideoRec(this.tasksHolder, this.mic, this.cam);
      videoRec.create();
      console.log('camera');
    });
  }
}
