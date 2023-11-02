import { Autoplay, Navigation, Pagination, SwiperOptions, A11y } from "swiper"

import { Slider } from "./slider"

class FourPieceSlider extends Slider {
  readonly playButton: HTMLElement

  isRunning: boolean

  isRunningStateOfButton: boolean

  constructor(container: HTMLElement, parameters: SwiperOptions, playButton: HTMLElement) {
    super(container, parameters)
    this.playButton = playButton
    this.isRunning = true
    this.isRunningStateOfButton = false
  }

  init() {
    super.init()
    this.playButton.addEventListener("click", () => {
      if (this.isRunning) {
        this.stopLoop()
        this.isRunningStateOfButton = true
        this.playButton.setAttribute("aria-label", "Play the automatic playback of the carousel")
      } else {
        this.playLoop()
        this.isRunningStateOfButton = false
        this.playButton.setAttribute("aria-label", "Pause the automatic playback of the carousel")
      }
    })

    const bannerLinks = this.container.querySelectorAll<HTMLElement>(".js-four-piece-slider-link")
    if (!bannerLinks) return

    for (const link of bannerLinks) {
      link.addEventListener("mouseover", () => {
        if (this.isRunning) {
          this.stopLoop()
        }
      })
      link.addEventListener("mouseleave", () => {
        if (!this.isRunning && !this.isRunningStateOfButton) {
          this.playLoop()
        }
      })
      link.addEventListener("focus", () => {
        if (this.isRunning) {
          this.stopLoop()
        }
      })
      link.addEventListener("blur", () => {
        if (!this.isRunning && !this.isRunningStateOfButton) {
          this.playLoop()
        }
      })
    }
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

const MAP = {
  sp: ".js-four-piece-slider-sp",
  pc: ".js-four-piece-slider-pc",
} as const

type MapKey = keyof typeof MAP

export const fourPieceSlider = (option: MapKey) => {
  const rootSelector = MAP[option]
  const targetRoot = document.querySelector<HTMLElement>(rootSelector)

  if (!targetRoot) return

  const playButton = targetRoot.querySelector<HTMLElement>(`${rootSelector}-play`)

  if (!playButton) return

  const defaultParameters = {
    modules: [A11y, Autoplay, Pagination, Navigation],
    loop: true,
    speed: 500,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: `${rootSelector}-next`,
      prevEl: `${rootSelector}-prev`,
    },
    pagination: {
      el: `${rootSelector}-pagination`,
      clickable: true,
      bulletElement: "button type='button'",
    },
    a11y: {
      prevSlideMessage: "Back to previous slide",
      nextSlideMessage: "Go to next slide",
      slideLabelMessage: "Show {{index}} slide",
      paginationBulletMessage: "Show {{index}} slide",
    },
  }

  const parametersSp = {
    ...defaultParameters,
    slidesPerView: 2,
    spaceBetween: 10,
    allowTouchMove: true,
  }

  const parametersPc = {
    ...defaultParameters,
    slidesPerView: 4,
    spaceBetween: 15,

    breakpoints: {
      1024: {
        threshold: 999_999,
        spaceBetween: 20,
      },
    },
  }

  const mvSliderInstance = new FourPieceSlider(targetRoot, option === "sp" ? parametersSp : parametersPc, playButton)

  mvSliderInstance.init()
}
