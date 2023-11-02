import { A11y, Autoplay, Navigation, SwiperOptions } from "swiper"

import { matchMedia } from "../utility"

import { Slider } from "./slider"

class ThreePieceSlider extends Slider {
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

    const bannerLinks = this.container.querySelectorAll<HTMLElement>(".js-slider-link")
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

export const threePieceSlider = (rootSelector = ".js-three-piece-slider-trip") => {
  const targetRoot = document.querySelector<HTMLElement>(rootSelector)
  if (!targetRoot) return

  const slides = targetRoot.querySelectorAll<HTMLElement>(".swiper-slide")

  const playButton = targetRoot.querySelector<HTMLElement>(`${rootSelector}-play`)

  if (!playButton) return

  if (slides.length <= 1) {
    playButton.setAttribute("style", "display:none;")
  }

  const parameters = {
    modules: [A11y, Autoplay, Navigation],
    loop: true,
    speed: 500,
    spaceBetween: 15,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: `${rootSelector}-next`,
      prevEl: `${rootSelector}-prev`,
    },
    a11y: {
      prevSlideMessage: "Back to previous slide",
      nextSlideMessage: "Go to next slide",
    },
  }

  const parametersSp = {
    ...parameters,
    slidesPerView: 1,
    allowTouchMove: true,
  }

  const parametersPc = {
    ...parameters,
    slidesPerView: 3,
    spaceBetween: 16,

    breakpoints: {
      1024: {
        spaceBetween: 26,
        threshold: 999_999,
      },
    },
  }

  const instanceSp = new ThreePieceSlider(targetRoot, parametersSp, playButton)
  const instancePc = new ThreePieceSlider(targetRoot, parametersPc, playButton)

  const listener = (event: MediaQueryList | MediaQueryListEvent) => {
    if (event.matches) {
      instanceSp.destroy()
      instancePc.init()
    } else {
      instancePc.destroy()
      instanceSp.init()
    }
  }

  const mediaQueryList = matchMedia("md")
  mediaQueryList.addEventListener("change", listener)
  listener(mediaQueryList)
}
