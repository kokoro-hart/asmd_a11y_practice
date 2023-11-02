import { Autoplay, Pagination, Navigation, SwiperOptions, A11y } from "swiper"

import { Slider } from "./slider"

class SingleSlider extends Slider {
  readonly playButton: HTMLElement

  isRunning: boolean

  constructor(container: HTMLElement, parameters: SwiperOptions, playButton: HTMLElement) {
    super(container, parameters)
    this.playButton = playButton
    this.isRunning = true
  }

  init() {
    super.init()

    this.playButton?.addEventListener("click", () => {
      if (this.isRunning) {
        this.stopLoop()
        this.playButton.setAttribute("aria-label", "Play the automatic playback of the carousel")
      } else {
        this.playLoop()
        this.playButton.setAttribute("aria-label", "Pause the automatic playback of the carousel")
      }
    })
  }

  private playLoop() {
    if (!this.instance) return
    this.instance.autoplay.start()
    this.instance.pagination.update()
    this.container?.classList.remove("_isStop")
    this.isRunning = true
    this.playButton.dataset.play = "true"
  }

  private stopLoop() {
    if (!this.instance) return
    this.instance.autoplay.stop()
    this.container?.classList.add("_isStop")
    this.isRunning = false
    this.playButton.dataset.play = "false"
  }
}

export const singleSlider = () => {
  const targetRoot = document.querySelector<HTMLElement>(".js-single-slider")
  if (!targetRoot) return

  const slides = targetRoot.querySelectorAll<HTMLElement>(".swiper-slide")

  const playButton = targetRoot.querySelector<HTMLElement>(".js-single-slider-play")

  if (!playButton) return

  if (slides.length <= 1) {
    playButton.setAttribute("style", "display:none;")
  }

  const parameters = {
    modules: [A11y, Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    loop: slides.length > 1,
    loopAdditionalSlides: slides.length,
    speed: 800,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".js-single-slider-next",
      prevEl: ".js-single-slider-prev",
    },
    pagination: {
      el: ".js-single-slider-pagination",
      clickable: true,
      bulletElement: "button type='button'",
    },
    a11y: {
      prevSlideMessage: "Back to previous slide",
      nextSlideMessage: "Go to next slide",
      slideLabelMessage: "Show {{index}} slide",
      paginationBulletMessage: "Show {{index}} slide",
    },
    allowTouchMove: true,
  }

  const mvSliderInstance = new SingleSlider(targetRoot, parameters, playButton)

  mvSliderInstance.init()
}
