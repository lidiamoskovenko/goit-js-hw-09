import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];

        if (selectedDate > new Date()) {
            refs.startBtn.disabled = false;
        } else {
            Notiflix.Notify.warning("Please choose a date in the future");
            refs.startBtn.disabled = true;
        }
    },
  };
  function pad(value) {
    return String(value).padStart(2,'0');
}
  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = pad(Math.floor(ms / day));
    const hours = pad(Math.floor((ms % day) / hour));
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
  
const refs = {
    text: document.querySelector("#datetime-picker"),
    startBtn: document.querySelector('[data-start]'),
    day:document.querySelector('[data-days]'),
    hour:document.querySelector('[data-hours]'),
    minutes:document.querySelector('[data-minutes]'),
    seconds:document.querySelector('[data-seconds]'),};
refs.startBtn.disabled = true;
refs.text.disabled = false;

let timerId = null;

  const flLbr=flatpickr(refs.text, options);

refs.startBtn.addEventListener('click', () =>
{let timerId = setInterval(()=>{
    refs.startBtn.disabled = true;
    refs.text.disabled = true;

    const startTime=flLbr.selectedDates[0];
    const currentTime = new Date();
    const deltaTime = startTime-currentTime;
    const timerTime = convertMs(startTime-currentTime);
    updateTimer(timerTime);
        if(deltaTime <= 1000){
            clearInterval(timerId);
            refs.text.disabled = false;
}},1000)});

function updateTimer(data){
    refs.day.textContent = pad(data.days);
    refs.hour.textContent = pad(data.hours);
    refs.minutes.textContent = pad(data.minutes);
    refs.seconds.textContent = pad(data.seconds);
}






