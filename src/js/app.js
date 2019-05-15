import PostsList from './PostsList';

const widgetHolder = document.querySelector('[data-id=listHolder]');
const widget = new PostsList(widgetHolder);
widget.create();
