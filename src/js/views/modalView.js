const btn_open_quate = document.querySelector('.btn--open-quote');
const btn_close_quate = document.querySelector('.btn--close-quote');
const btn_close_cv = document.querySelector('.btn--close-cv');
const btn_open_cv = document.querySelector('.btn--info');
const modal_cv = document.querySelector('.cv-modal');
const modal_cv_overlay = document.querySelector('.cv-popup');
const modal_quate = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

// Modal toggeling

const toggleModal = function () {
  modal_quate.classList.toggle('modal-open');
  overlay.classList.toggle('overlay-visible');
};

const addHandlerShowModal = function () {
  btn_open_quate.addEventListener('click', toggleModal);
};

const addHandlerHideModal = function () {
  btn_close_quate.addEventListener('click', toggleModal);

  overlay.addEventListener('click', function () {
    if (modal_quate.classList.contains('modal-open')) {
      toggleModal();
      console.log('Yep');
    }
  });
};

addHandlerHideModal();
addHandlerShowModal();

// CV modal

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
