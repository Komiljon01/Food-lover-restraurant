"use strict";
// Modules
import tabs from "./modules/tabs";
import loader from "./modules/loader";
import timer from "./modules/timer";
import modal, { openModal } from "./modules/modal";
import offers from "./modules/offers";
import form from "./modules/form";
import slider from "./modules/slider";

window.addEventListener("DOMContentLoaded", () => {
  const modalTimer = setTimeout(() => {
    openModal(".modal__content", ".modal", modalTimer);
  }, 6000);

  tabs(".tabheader__item", ".tabheader__items", ".tab_content");
  loader(".loader-wrapper");
  timer("2025-01-01", ".timer");
  modal("[data-modal]", ".modal", ".modal__content", modalTimer);
  offers(".offers-items");
  form("form", modalTimer);
  slider();
});
