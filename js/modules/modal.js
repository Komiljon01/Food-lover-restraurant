function openModal(modalContentSelector, modalSelector, modalTimer) {
  const modalContent = document.querySelector(modalContentSelector),
    modal = document.querySelector(modalSelector);

  modalContent.classList.add("modal_fade");
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";

  if (modalTimer) {
    clearInterval(modalTimer);
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove("show");
  modal.classList.add("hide");
  document.body.style.overflow = "auto";
}

function modal(btnsSelector, modalSelector, modalContentSelector, modalTimer) {
  const modalOpenBtn = document.querySelectorAll(btnsSelector),
    modal = document.querySelector(modalSelector);

  modalOpenBtn.forEach((btn) => {
    btn.addEventListener("click", () =>
      openModal(modalContentSelector, modalSelector, modalTimer)
    );
  });

  modal.addEventListener("click", (e) => {
    if (
      e.target === modal ||
      e.target.getAttribute("data-modal-close") === ""
    ) {
      closeModal(modalSelector);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (modal.classList.contains("show") && e.key === "Escape") {
      closeModal(modalSelector);
    }
  });
}

export default modal;
export { openModal, closeModal };
