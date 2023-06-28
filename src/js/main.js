import "../source/scss/_nullstyle.scss";
import "../source/scss/main.scss";
import Swiper, { Navigation, Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "../../node_modules/aos/dist/aos.css";
import AOS from "../../node_modules/aos/dist/aos.js";
import "../index.html";

document.addEventListener("DOMContentLoaded", () => {
  AOS.init();
  const nav = document.querySelector(".header__nav");
  const up = document.querySelector(".up");
  const frames = document.querySelectorAll(".frame__container");
  let isLoaded1 = true;
  let isLoaded2 = true;
  const bg = document.querySelector(".header");
  const card = document.querySelector(".header__cart");
  const backet = document.querySelector(".who__image");

  window.addEventListener("load", (e) => {
    if (backet) {
      Visible(backet) ? backet.classList.add("animate") : null;
    }
  });

  document.addEventListener("scroll", (e) => {
    window.pageYOffset > 100
      ? nav.classList.add("header__nav-active")
      : nav.classList.remove("header__nav-active");
    window.pageYOffset > 500
      ? up.classList.add("up-active")
      : up.classList.remove("up-active");
    if (card) {
      window.pageYOffset < 400 && window.innerWidth > 1200
        ? (bg.style.backgroundPosition = `calc(400px + 50%) calc(120% - ${window.pageYOffset / 2
          }px), center`)
        : window.pageYOffset < 400 && window.innerWidth > 1000
          ? (bg.style.backgroundPosition = `166% calc(120% - ${window.pageYOffset / 2
            }px), center`)
          : window.pageYOffset < 400
            ? (bg.style.backgroundPosition = `center calc(50% - ${window.pageYOffset / 4
              }px), center`)
            : null;
    }
    if (backet) {
      Visible(backet) ? backet.classList.add("animate") : null;
    }
    if (frames.length) {
      const isVisible1 =
        offset(frames[0]).top <
        document.documentElement.clientHeight + window.pageYOffset;
      const isVisible2 =
        offset(frames[1]).top <
        document.documentElement.clientHeight + window.pageYOffset;

      isVisible1 && isLoaded1 ? frameLoader(frames[0], isLoaded1) : null;
      isVisible2 && isLoaded2 ? frameLoader(frames[1], isLoaded2) : null;
    }
  });

  up.addEventListener("click", () => {
    window.scrollTo(0, 0);
  });

  const burger = document.querySelector(".header__burger");
  const right = document.querySelector(".header__right");
  burger.addEventListener("click", (e) => {
    nav.classList.toggle("header__nav-open");
    handleOpen(right, nav.classList.contains("header__nav-open"));
  });

  function frameLoader(frame) {
    frame.insertAdjacentHTML(
      "beforeend",
      `<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/C_RBMC5-JxU"
      title="YouTube video player" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>`
    );

    frame === frames[0] ? (isLoaded1 = false) : null;
    frame === frames[1] ? (isLoaded2 = false) : null;
  }


  const form = document.querySelector(".form");

  if (form) {
    const selects = document.querySelectorAll(".form__select-container");
    const inpBtn = form.querySelector(".form__sum-input");
    const checkBtn = document.getElementById("sum-7");
    checkBtn.addEventListener("change", (e) => {
      checkBtn.checked ? inpBtn.focus() : null;
    });

    for (let select of selects) {
      const content = select.querySelector(".form__selected-text");
      const selected = select.querySelector(".form__selected");
      const wrapper = select.querySelector(".form__select-wrapper");
      const links = select.querySelectorAll(".form__select-link");

      if (selected.dataset.disable !== "true") {
        selected.addEventListener("click", (e) => {
          selected.classList.toggle("form__selected-active");
          handleOpen(
            wrapper,
            selected.classList.contains("form__selected-active")
          );
        });

        for (let link of links) {
          link.addEventListener("click", (e) => {
            content.textContent = link.textContent;
            content.classList.add("form__selected-text-active");
            selected.classList.remove("form__selected-active");
            link
              .closest(".form__select-container")
              .querySelector(".form__selected")
              .classList.remove("input-invalid");
            handleOpen(wrapper, false);
          });
        }
      }
    }

    const forma = document.querySelector(".form__form");

    forma.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputs = document.querySelectorAll("[data-required='true']");

      for (let input of inputs) {
        if (
          (input.type === "text" ||
            input.type === "email" ||
            input.type === "tel") &&
          input.value === ""
        ) {
          input.parentElement.classList.add("input-invalid");
          input.addEventListener("change", () =>
            input.parentElement.classList.remove("input-invalid")
          );
        }

        if (input.type === "checkbox" && input.checked === false) {
          input.parentElement.classList.add("input-invalid");
          input.addEventListener("change", () =>
            input.parentElement.classList.remove("input-invalid")
          );
        }

        if (
          input.classList.contains("form__selected-text") &&
          input.textContent === input.dataset.text
        ) {
          input.parentElement.classList.add("input-invalid");
        }
      }
    });
  }

  const reviews = document.querySelectorAll('.reviews__text-block');
  if (reviews.length && window.innerWidth <= 1000) {
    for (let review of reviews) {
      const blocks = review.querySelectorAll('.reviews__text');
      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        if (block !== blocks[0]) {
          block.style.display !== 'block' ? block.style.display = 'none' : null;
        }
        if (block === blocks[0]) {
          block.style.display = 'block';
          const more = document.createElement('span');
          more.textContent = 'Еще';
          more.style.color = '#8993a6';
          const dot = block.textContent.trim().slice(-1);
          block.innerHTML = block.innerHTML.trim().slice(0, -1) + '...';
          more.addEventListener('click', () => {
            for (let block of blocks) {
              block.style.display === 'block' ? null : block.style.display = 'block';
            }
            more.remove();
            block.innerHTML = block.innerHTML.trim().slice(0, -3) + dot;
            slider2.update();
          });
          block.appendChild(more);
        }
      }
    }
  }


  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop };
  }

  function Visible(target) {
    const targetPosition = {
      top:
        window.pageYOffset +
        target.getBoundingClientRect().top +
        target.scrollHeight / 4,
      left: window.pageXOffset + target.getBoundingClientRect().left,
      right: window.pageXOffset + target.getBoundingClientRect().right,
      bottom:
        window.pageYOffset +
        target.getBoundingClientRect().bottom +
        target.scrollHeight / 4,
    },
      windowPosition = {
        top: window.pageYOffset,
        left: window.pageXOffset,
        right: window.pageXOffset + document.documentElement.clientWidth,
        bottom: window.pageYOffset + document.documentElement.clientHeight,
      };

    if (
      targetPosition.bottom > windowPosition.top &&
      targetPosition.top < windowPosition.bottom &&
      targetPosition.right > windowPosition.left &&
      targetPosition.left < windowPosition.right
    ) {
      return true;
    } else {
      return false;
    }
  }

  const handleOpen = (elBlock, active, x = 1) => {
    if (active) {
      elBlock.style.height = `${x * elBlock.scrollHeight}px`;
    } else {
      elBlock.style.height = `${elBlock.scrollHeight}px`;
      window.getComputedStyle(elBlock, null).getPropertyValue("height");
      elBlock.style.height = "0";
    }

    elBlock.addEventListener("transitionend", () => {
      if (elBlock.style.height !== "0px") {
        elBlock.style.height = "auto";
      }
    });
  };

  [].forEach.call(
    document.querySelectorAll('input[type="tel"]'),
    function (input) {
      var keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) {
          event.preventDefault();
          keyInput();
        }
        var matrix = "+7 (___) ___-__-__",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
          });
        i = new_value.indexOf("_");
        if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i);
        }
        var reg = matrix
          .substr(0, this.value.length)
          .replace(/_+/g, function (a) {
            return "\\d{1," + a.length + "}";
          })
          .replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (
          !reg.test(this.value) ||
          this.value.length < 5 ||
          (keyCode > 47 && keyCode < 58)
        )
          this.value = new_value;
        if (event.type == "blur" && this.value.length < 5) this.value = "";
      }

      function keyInput() {
        input.selectionStart = input.value.length;
      }

      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);
    }
  );
});

const slider = new Swiper(".partners__slider", {
  slidesPerView: 4,

  modules: [Navigation, Autoplay],

  navigation: {
    prevEl: ".partners__prev",
    nextEl: ".partners__next",
  },
  autoplay: {
    delay: 1000,
  },

  breakpoints: {
    320: {
      direction: "vertical",
      slidesPerView: 5,
      allowTouchMove: false,
    },
    1000: {
      direction: "horizontal",
      slidesPerView: 4,
      allowTouchMove: true,
      loop: true,
    },
  },

  on: {
    slideChange: function (swiper) {
      const slides = swiper.slides;
      for (let i = 0; i < slides.length; i++) {
        for (let slide of slides) {
          slide.classList.remove("partners__slide-active");
        }
        if (slides[i] === swiper.slides[swiper.activeIndex]) {
          slides[i].classList.add("partners__slide-active");
          slides[i + 1].classList.add("partners__slide-active");
          slides[i + 2].classList.add("partners__slide-active");
          break;
        }
      }
    },
    init: function (swiper) {
      const slides = swiper.slides;
      for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("partners__slide-active");
        if (slides[i] === swiper.slides[swiper.activeIndex]) {
          slides[i].classList.add("partners__slide-active");
          slides[i + 1].classList.add("partners__slide-active");
          slides[i + 2].classList.add("partners__slide-active");
          break;
        }
      }
    },
  },
});

const slider2 = new Swiper(".reviews__slider", {
  modules: [Pagination, Autoplay],

  autoplay: {
    delay: 10000,
  },

  slidesPerView: 1,
  spaceBetween: 32,
  allowTouchMove: false,
  initialSlide: 1,
  autoHeight: true,

  pagination: {
    el: ".reviews__pagination",
    clickable: true,
  },
});

