const btn_close_cv = document.querySelector('.btn--close-cv');
const btn_open_cv = document.querySelector('.btn--info');
const modal_cv = document.querySelector('.cv-modal');
const modal_cv_overlay = document.querySelector('.cv-popup');

const toggleCVModal = function () {
  modal_cv_overlay.classList.toggle('hidden');
};

const addHandlerShowCVModal = function () {
  btn_open_cv.addEventListener('click', toggleCVModal);
};

const addHandlerHideCVModal = function () {
  modal_cv_overlay.addEventListener('click', e => {
    if (e.target.classList.contains('cv-popup')) {
      toggleCVModal();
    }
  });
};

addHandlerShowCVModal();
addHandlerHideCVModal();
