const DELAY = 1000;
const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};
let intervalId = null;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

disabledStopBtn();

function onStartBtnClick() {
  setBodyBgColor();

  intervalId = setInterval(() => {
    setBodyBgColor();
  }, DELAY);

  refs.startBtn.setAttribute('disabled', 'disabled');
  refs.stopBtn.removeAttribute('disabled');
}

function onStopBtnClick() {
  clearInterval(intervalId);

  refs.startBtn.removeAttribute('disabled');
  disabledStopBtn();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function disabledStopBtn() {
  refs.stopBtn.setAttribute('disabled', 'disabled');
}

function setBodyBgColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}
