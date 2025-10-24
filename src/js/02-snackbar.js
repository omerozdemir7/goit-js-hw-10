import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const delayInput = form.querySelector('input[name="delay"]');
const stateInputs = form.querySelectorAll('input[name="state"]');

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const delay = Number(delayInput.value);
  const state = Array.from(stateInputs).find(i => i.checked).value;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") resolve(delay);
      else reject(delay);
    }, delay);
  })
    .then(ms => {
      iziToast.success({
        title: "✅ Başarılı",
        message: `Fulfilled promise in ${ms}ms`,
        position: "topRight",
        timeout: 3000,
      });
    })
    .catch(ms => {
      iziToast.error({
        title: "❌ Hata",
        message: `Rejected promise in ${ms}ms`,
        position: "topRight",
        timeout: 3000,
      });
    });
});
