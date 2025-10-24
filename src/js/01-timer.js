import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// ✅ Bildirim fonksiyonu
function showToast(type, message) {
  const options = {
    title: type === "warning" ? "Uyarı ⚠️" : "Bilgi ℹ️",
    message,
    position: "topRight",
    timeout: 3000,
  };
  if (type === "success") iziToast.success(options);
  else if (type === "error") iziToast.error(options);
  else iziToast.warning(options);
}

const startBtn = document.querySelector("[data-start]");
const datePicker = document.getElementById("datetime-picker");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

let userSelectedDate = null;
let timerInterval = null;

startBtn.disabled = true;

flatpickr(datePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      showToast("warning", "Please choose a date in the future");
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
      showToast("success", "Valid date selected! Click 'Başlat' to start");
    }
  },
});

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  showToast("success", "Timer started!");
  timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
});

function updateTimer() {
  const now = new Date();
  const delta = userSelectedDate - now;

  if (delta <= 0) {
    clearInterval(timerInterval);
    updateDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    showToast("success", "Time's up!");
    return;
  }

  updateDisplay(convertMs(delta));
}

function updateDisplay({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
