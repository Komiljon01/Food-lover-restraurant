import { openModal, closeModal } from "./modal";

function form(formSelector, modalTimer) {
  const form = document.querySelector(formSelector),
    telegramTokenBot = "6271273651:AAFRV4_UO7rWkyYV-LqfzlMQWvX5I3b-BeQ",
    chatID = "714012440";

  const message = {
    loading: "Loading...",
    success: "Thanks for your contacts ❤",
    failure: "Something went wrong 🤔",
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const loader = document.createElement("div");
    loader.classList.add("loader", "loaderModal");
    form.append(loader);

    const formData = new FormData(form);
    const obj = {};

    formData.forEach((value, key) => {
      obj[key] = value;
    });

    form.reset();

    fetch(`https://api.telegram.org/bot${telegramTokenBot}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatID,
        text: `
        👤 Name: ${obj.name}, 
        📞 Phone: ${obj.phone}`,
      }),
    })
      .then(() => showModalMessage(message.success))
      .catch(() => showModalMessage(message.failure))
      .finally(() => loader.remove());
  });

  function showModalMessage(message) {
    const modalDialog = document.querySelector(".modal__dialog");

    modalDialog.classList.add("hide");
    openModal(".modal__content", ".modal", modalTimer);

    const statusModal = document.createElement("div");
    statusModal.classList.add("modal__dialog");
    statusModal.innerHTML = `
    <div class="modal__content">
      <form action="#">
        <div data-modal-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
      </form>
    </div>
  `;

    document.querySelector(".modal").append(statusModal);

    setTimeout(() => {
      statusModal.remove();
      modalDialog.classList.remove("hide");
      closeModal(".modal");
    }, 4000);
  }
}

export default form;
