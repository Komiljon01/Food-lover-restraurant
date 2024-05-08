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

export default slider;
