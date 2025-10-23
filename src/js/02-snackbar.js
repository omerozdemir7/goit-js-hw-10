import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const delayInput = document.getElementById("delay");
const startBtn = document.getElementById("start-btn");

// Bildirim teması (daha hoş renklerle)
iziToast.settings({
  timeout: 3000,
  progressBar: true,
  close: true,
  transitionIn: "fadeInDown",
  transitionOut: "fadeOutUp",
  position: "topCenter",
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const delay = Number(delayInput.value);
  const state = form.elements.state.value;

  if (!delay || delay < 0) {
    iziToast.warning({
      title: "Uyarı ⚠️",
      message: "Lütfen geçerli bir bekleme süresi girin!",
    });
    return;
  }

  iziToast.info({
    title: "⏳ Bekleniyor...",
    message: `${delay} ms sonra sonuç gösterilecek.`,
  });

  // Promise oluştur
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(`✅ Promise başarıyla tamamlandı (${delay} ms)`);
      } else {
        reject(`❌ Promise başarısız oldu (${delay} ms)`);
      }
    }, delay);
  });

  // Promise sonucuna göre bildirim ver
  promise
    .then((msg) => {
      iziToast.success({
        title: "Başarılı 🎉",
        message: msg,
      });
    })
    .catch((err) => {
      iziToast.error({
        title: "Hata 💥",
        message: err,
      });
    });
});
