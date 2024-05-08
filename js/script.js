"use strict";
window.addEventListener("DOMContentLoaded", () => {
  // Tabs
  const tabsParent = document.querySelector(".tabheader__items"),
    tabs = document.querySelectorAll(".tabheader__item"),
    tabContents = document.querySelectorAll(".tab_content");

  function hideTabsContent() {
    tabContents.forEach((tabContent) => {
      tabContent.classList.add("hide");
      tabContent.classList.remove("show", "fade");
    });

    tabs.forEach((tab) => {
      tab.classList.remove("tabheader__item_active");
    });
  }

  function showTabsContent(index = 0) {
    tabContents[index].classList.add("show", "fade");
    tabContents[index].classList.remove("hide");
    tabs[index].classList.add("tabheader__item_active");
  }

  hideTabsContent();
  showTabsContent();

  tabsParent.addEventListener("click", (e) => {
    const target = e.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((tab, index) => {
        if (target == tab) {
          hideTabsContent();
          showTabsContent(index);
        }
      });
    }
  });

  // Loader
  const loader = document.querySelector(".loader-wrapper");

  setTimeout(() => {
    loader.style.opacity = 0;
    setTimeout(() => {
      loader.style.display = "none";
    }, 100);
  }, 3000);

  // Timer
  const deadline = "2025-01-01";

  function getTimeRemaining(endtime) {
    const time = Date.parse(endtime) - Date.parse(new Date());
    let days, hours, minutes, seconds;

    if (time <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(time / (1000 * 60 * 60 * 24));
      hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((time / (1000 * 60)) % 60);
      seconds = Math.floor((time / 1000) % 60);
    }

    return { totalTime: time, days, hours, minutes, seconds };
  }

  function formatNumber(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timerInterval = setInterval(updateClock, 1000);

    updateClock();
    function updateClock() {
      const time = getTimeRemaining(endtime);

      days.textContent = formatNumber(time.days);
      hours.textContent = formatNumber(time.hours);
      minutes.textContent = formatNumber(time.minutes);
      seconds.textContent = formatNumber(time.seconds);

      if (time.totalTime <= 0) {
        clearInterval(timerInterval);
      }
    }
  }

  setClock(".timer", deadline);

  // Modal
  const modalOpenBtn = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalContent = document.querySelector(".modal__content");

  function openModal() {
    modalContent.classList.add("modal_fade");
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimer);
  }

  function closeModal() {
    modal.classList.remove("show");
    modal.classList.add("hide");
    document.body.style.overflow = "auto";
  }

  modalOpenBtn.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  modal.addEventListener("click", (e) => {
    if (
      e.target === modal ||
      e.target.getAttribute("data-modal-close") === ""
    ) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (modal.classList.contains("show") && e.key === "Escape") {
      closeModal();
    }
  });

  const modalTimer = setTimeout(openModal, 6000);

  // Classes
  class OfferMenu {
    constructor(src, alt, title, descr, discount, sale, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.discount = discount;
      this.sale = sale;
      this.parent = document.querySelector(parentSelector);
      this.formatToUZS();
    }

    formatToUZS() {
      this.discount = this.discount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
      this.sale = this.sale.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }

    render() {
      const element = document.createElement("div");
      element.innerHTML = `
        <img src=${this.src} alt=${this.alt} />
        <div>
          <h3>${this.title}</h3>
          <p>${this.descr}</p>
          <p>
            <del>${this.discount}</del> <span class="primary-text">${this.sale}</span>
          </p>
        </div>
      `;

      this.parent.append(element);
    }
  }

  fetch("http://localhost:3000/offers", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((offers) => {
      offers.forEach((offer) => {
        const { src, alt, title, descr, discount, sale } = offer;
        new OfferMenu(
          src,
          alt,
          title,
          descr,
          discount,
          sale,
          ".offers-items"
        ).render();
      });
    });

  // Form
  const form = document.querySelector("form"),
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
    openModal();

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
      closeModal();
    }, 4000);
  }

  // Slider
  const slides = document.querySelectorAll(".offer__slide"),
    nextSlider = document.querySelector(".offer__slider-next"),
    prevSlider = document.querySelector(".offer__slider-prev"),
    totalSlides = document.querySelector("#total"),
    currentSlider = document.querySelector("#current"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesInner = document.querySelector(".offer__slider-inner"),
    slidesWrapperWidth = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1,
    offset = 0;

  if (slides.length < 10) {
    totalSlides.textContent = `0${slides.length}`;
    currentSlider.textContent = `0${slideIndex}`;
  } else {
    totalSlides.textContent = slides.length;
    currentSlider.textContent = slideIndex;
  }

  slidesInner.style.width = 100 * slides.length + "%";
  slidesInner.style.display = "flex";
  slidesInner.style.transition = "all .5s ease";

  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = slidesWrapperWidth;
  });

  nextSlider.addEventListener("click", () => {
    if (
      offset ===
      +slidesWrapperWidth.replace(/\D/g, "") * (slides.length - 1)
    ) {
      offset = 0;
    } else {
      offset += +slidesWrapperWidth.replace(/\D/g, "");
    }
    slidesInner.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      currentSlider.textContent = `0${slideIndex}`;
    } else {
      currentSlider.textContent = slideIndex;
    }
  });

  prevSlider.addEventListener("click", () => {
    if (offset === 0) {
      offset = +slidesWrapperWidth.replace(/\D/g, "") * (slides.length - 1);
    } else {
      offset -= +slidesWrapperWidth.replace(/\D/g, "");
    }
    slidesInner.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      currentSlider.textContent = `0${slideIndex}`;
    } else {
      currentSlider.textContent = slideIndex;
    }
  });
});
