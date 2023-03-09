import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DELAY = 1000;
const refs = {
  inputEl: document.querySelector('input[type="text"]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minsEl: document.querySelector('[data-minutes]'),
  secsEl: document.querySelector('[data-seconds]'),
  startBtn: document.querySelector('[data-start]'),
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const deltaTime = selectedDates[0] - Date.now();

    if (deltaTime < 0) {
      Notify.failure('Please choose a date in the future');
      disabledStartBtn();
    } else {
      refs.startBtn.removeAttribute('disabled');

      refs.startBtn.addEventListener('click', () => {
        if (isActive) {
          return;
        }
        disabledStartBtn();
        isActive = true;
        setInterval(() => {
          const currentTime = Date.now();
          const deltaTime = selectedDates[0] - currentTime;

          updateClockFace(convertMs(deltaTime));
        }, DELAY);
      });
    }
  },
};

let isActive = false;

disabledStartBtn();

flatpickr(refs.inputEl, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function disabledStartBtn() {
  refs.startBtn.setAttribute('disabled', 'disabled');
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = days;
  refs.hoursEl.textContent = hours;
  refs.minsEl.textContent = minutes;
  refs.secsEl.textContent = seconds;
}
