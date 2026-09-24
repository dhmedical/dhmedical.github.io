/*!
* Start Bootstrap - Small Business v5.0.6 (https://startbootstrap.com/template/small-business)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-small-business/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
```html
<script>
/* =========================================
   VIDEO SHOWCASE — SLIDER
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const slides = Array.from(
    document.querySelectorAll(".video-slide")
  );

  const dots = Array.from(
    document.querySelectorAll(".video-dot")
  );

  const prevButton =
    document.querySelector(".video-slider-prev");

  const nextButton =
    document.querySelector(".video-slider-next");

  if (!slides.length) return;

  let current = 0;
  let startX = 0;
  let isDragging = false;


  /* -----------------------------------------
     UPDATE SLIDER
  ----------------------------------------- */

  function updateSlider() {

    slides.forEach((slide, index) => {

      slide.classList.remove(
        "is-active",
        "is-prev",
        "is-next"
      );

      const video =
        slide.querySelector(".video-element");

      if (video) {
        video.pause();
        video.currentTime = 0;
      }

      const playButton =
        slide.querySelector(".video-play");

      if (playButton) {
        playButton.innerHTML =
          '<i class="bi bi-play-fill"></i>';
      }

    });


    /* Active */

    slides[current].classList.add("is-active");


    /* Previous */

    const previous =
      (current - 1 + slides.length) % slides.length;

    slides[previous].classList.add("is-prev");


    /* Next */

    const next =
      (current + 1) % slides.length;

    slides[next].classList.add("is-next");


    /* Play active video */

    const activeVideo =
      slides[current].querySelector(".video-element");

    if (activeVideo) {

      activeVideo.muted = true;

      activeVideo.play().catch(() => {});

    }


    /* Dots */

    dots.forEach((dot, index) => {

      dot.classList.toggle(
        "is-active",
        index === current
      );

    });

  }


  /* -----------------------------------------
     GO TO SLIDE
  ----------------------------------------- */

  function goTo(index) {

    current =
      (index + slides.length) % slides.length;

    updateSlider();

  }


  /* -----------------------------------------
     ARROWS
  ----------------------------------------- */

  prevButton?.addEventListener("click", () => {

    goTo(current - 1);

  });


  nextButton?.addEventListener("click", () => {

    goTo(current + 1);

  });


  /* -----------------------------------------
     DOTS
  ----------------------------------------- */

  dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

      goTo(index);

    });

  });


  /* -----------------------------------------
     PLAY BUTTON
  ----------------------------------------- */

  slides.forEach((slide) => {

    const video =
      slide.querySelector(".video-element");

    const playButton =
      slide.querySelector(".video-play");


    if (!video || !playButton) return;


    playButton.addEventListener("click", (event) => {

      event.stopPropagation();


      if (video.paused) {

        video.muted = false;

        video.play().catch(() => {

          video.muted = true;

          video.play().catch(() => {});

        });

        playButton.innerHTML =
          '<i class="bi bi-pause-fill"></i>';

      } else {

        video.pause();

        playButton.innerHTML =
          '<i class="bi bi-play-fill"></i>';

      }

    });


    video.addEventListener("play", () => {

      if (slide.classList.contains("is-active")) {

        playButton.innerHTML =
          '<i class="bi bi-pause-fill"></i>';

      }

    });


    video.addEventListener("pause", () => {

      playButton.innerHTML =
        '<i class="bi bi-play-fill"></i>';

    });

  });


  /* -----------------------------------------
     SWIPE / DRAG
  ----------------------------------------- */

  const track =
    document.querySelector(".video-slider-track");


  track?.addEventListener(
    "pointerdown",
    (event) => {

      startX = event.clientX;
      isDragging = true;

      track.setPointerCapture?.(event.pointerId);

    }
  );


  track?.addEventListener(
    "pointerup",
    (event) => {

      if (!isDragging) return;

      const difference =
        event.clientX - startX;

      isDragging = false;


      if (Math.abs(difference) < 50) return;


      if (difference < 0) {

        goTo(current + 1);

      } else {

        goTo(current - 1);

      }

    }
  );


  track?.addEventListener(
    "pointercancel",
    () => {

      isDragging = false;

    }
  );


  /* -----------------------------------------
     KEYBOARD
  ----------------------------------------- */

  document.addEventListener("keydown", (event) => {

    const section =
      document.querySelector(".video-showcase");

    if (!section) return;


    const rect =
      section.getBoundingClientRect();

    const visible =
      rect.top < window.innerHeight &&
      rect.bottom > 0;


    if (!visible) return;


    if (event.key === "ArrowLeft") {

      goTo(current - 1);

    }

    if (event.key === "ArrowRight") {

      goTo(current + 1);

    }

  });


  /* -----------------------------------------
     START WHEN SECTION ENTERS VIEW
  ----------------------------------------- */

  const section =
    document.querySelector(".video-showcase");


  if ("IntersectionObserver" in window && section) {

    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              const video =
                slides[current]
                  .querySelector(".video-element");

              video?.play().catch(() => {});

            } else {

              slides.forEach((slide) => {

                slide
                  .querySelector(".video-element")
                  ?.pause();

              });

            }

          });

        },
        {
          threshold: 0.35
        }
      );


    observer.observe(section);

  }


  /* -----------------------------------------
     INITIAL STATE
  ----------------------------------------- */

  updateSlider();

});
</script>
