import SetDayNow from './setDayNow';

export default class CreatePost {
  constructor(parent, pos, text, media, mediaData) {
    this.tasksHolder = parent;
    this.position = pos;
    this.postText = text;
    this.media = media;
    this.mediaData = mediaData;
    this.postId = null;
  }

  create() {
    const dateTime = new SetDayNow(new Date());
    this.dateTime = dateTime.create();
    if (!this.media) {
      this.newPost();
    } else {
      this.newPostMedia();
    }
  }

  newPost() {
    const liEl = document.createElement('li');
    liEl.className = 'taskHolder';
    liEl.innerHTML = `
      <div class="task">
      <div class="post">
        <span class="description">${this.postText}</span>
        <span class="taskGeopos">${this.position}</span>
      </div>
      <div class="timeHolder">
        <span data-id="taskDate" class="taskDate">${this.dateTime}</span>
      </div>
    </div>`;

    const ulEl = this.tasksHolder.querySelector('[data-id=timelineHolder]');
    // добавляет перед "меню"
    ulEl.insertBefore(liEl, ulEl.lastChild);

    const textarea = document.querySelector('[data-id=textarea]');
    textarea.value = '';
  }

  newPostMedia() {
    const ulEl = this.tasksHolder.querySelector('[data-id=timelineHolder]');
    this.postId = ulEl.children.length;

    const liEl = document.createElement('li');
    liEl.className = 'taskHolder';
    liEl.setAttribute('data-id', `post_${this.postId}`);
    liEl.innerHTML = `
      <div class="task">
      <div class="post">
        <span data-id="media_${this.postId}"></span>
        <span class="taskGeopos">${this.position}</span>
      </div>
      <div class="timeHolder">
        <span data-id="taskDate" class="taskDate">${this.dateTime}</span>
      </div>
    </div>`;

    // добавляет перед "меню"
    ulEl.insertBefore(liEl, ulEl.lastChild);

    const media = this.tasksHolder.querySelector(`[data-id=media_${this.postId}]`);
    this.mediaData.style.opacity = 1;
    media.appendChild(this.mediaData);


    const textarea = document.querySelector('[data-id=textarea]');
    textarea.value = '';

    this.postId += 1;
  }
}
