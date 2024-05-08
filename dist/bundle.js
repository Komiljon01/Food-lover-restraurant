/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");


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
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal__content", ".modal", modalTimer);

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
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
    }, 4000);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);


/***/ }),

/***/ "./js/modules/loader.js":
/*!******************************!*\
  !*** ./js/modules/loader.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function loader(loaderSelector) {
  const loader = document.querySelector(loaderSelector);

  setTimeout(() => {
    loader.style.opacity = 0;
    setTimeout(() => {
      loader.style.display = "none";
    }, 100);
  }, 3000);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loader);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/offers.js":
/*!******************************!*\
  !*** ./js/modules/offers.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function offers(offersParentSelector) {
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
          offersParentSelector
        ).render();
      });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (offers);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsParentSelector, tabsContentSelector) {
  // Tabs
  const tabsParent = document.querySelector(tabsParentSelector),
    tabs = document.querySelectorAll(tabsSelector),
    tabContents = document.querySelectorAll(tabsContentSelector);

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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(deadline, selector) {
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

  setClock(selector, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/loader */ "./js/modules/loader.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_offers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/offers */ "./js/modules/offers.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

// Modules








window.addEventListener("DOMContentLoaded", () => {
  const modalTimer = setTimeout(() => {
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)(".modal__content", ".modal", modalTimer);
  }, 6000);

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", ".tabheader__items", ".tab_content");
  (0,_modules_loader__WEBPACK_IMPORTED_MODULE_1__["default"])(".loader-wrapper");
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])("2025-01-01", ".timer");
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])("[data-modal]", ".modal", ".modal__content", modalTimer);
  (0,_modules_offers__WEBPACK_IMPORTED_MODULE_4__["default"])(".offers-items");
  (0,_modules_form__WEBPACK_IMPORTED_MODULE_5__["default"])("form", modalTimer);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map