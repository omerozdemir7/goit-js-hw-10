import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const dateInput = document.getElementById("datetime-picker");
const startBtn = document.getElementById("start-btn");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

let selectedDate = null;
let countdownInterval = null;

// Takvimi açılabilir yap
const picker = flatpickr(dateInput, {
  enableTime: true,
  time_24hr: true,
  dateFormat: "Y-m-d H:i",
  minDate: "today",
  onChange(selectedDates) {
    selectedDate = selectedDates[0];
  },
});

// inputa tıklayınca takvim aç
dateInput.addEventListener("click", () => {
  picker.open();
});

startBtn.addEventListener("click", () => {
  if (!selectedDate) {
    iziToast.warning({
      title: "Uyarı",
      message: "Lütfen bir tarih ve saat seçin!",
      position: "topCenter",
    });
    return;
  }

  const now = new Date();
  if (selectedDate <= now) {
    iziToast.error({
      title: "Hatalı Zaman",
      message: "Geçmiş bir tarih seçemezsiniz!",
      position: "topCenter",
    });
    return;
  }

  iziToast.success({
    title: "Zamanlayıcı Başladı",
    message: "Geri sayım başladı 🎯",
    position: "topCenter",
  });

  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    const now = new Date();
    const diff = selectedDate - now;

    if (diff <= 0) {
      clearInterval(countdownInterval);
      updateTimer(0);
      iziToast.info({
        title: "Süre Doldu ⏰",
        message: "Zamanlayıcı tamamlandı!",
        position: "topCenter",
      });
      return;
    }

    updateTimer(diff);
  }, 1000);
});

function updateTimer(ms) {
  const sec = Math.floor(ms / 1000) % 60;
  const min = Math.floor(ms / 1000 / 60) % 60;
  const hrs = Math.floor(ms / 1000 / 60 / 60) % 24;
  const day = Math.floor(ms / 1000 / 60 / 60 / 24);

  daysEl.textContent = String(day).padStart(2, "0");
  hoursEl.textContent = String(hrs).padStart(2, "0");
  minutesEl.textContent = String(min).padStart(2, "0");
  secondsEl.textContent = String(sec).padStart(2, "0");
}
