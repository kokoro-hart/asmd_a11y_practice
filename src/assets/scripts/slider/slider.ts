import Swiper, { SwiperOptions } from "swiper"
import "swiper/css"
import "swiper/css/autoplay"
import "swiper/css/scrollbar"

export class Slider {
  container: HTMLElement

  parameters: SwiperOptions

  instance: Swiper | undefined

  constructor(swiperContainer: HTMLElement, parameters = {}) {
    this.container = swiperContainer
    this.parameters = parameters
    this.instance = undefined
  }

  init() {
    this.active()
  }

  destroy() {
    if (this.instance !== undefined) {
      this.instance.destroy()
    }
  }

  active() {
    this.instance = new Swiper(this.container, this.parameters)
  }

  inactive() {
    if (this.instance !== undefined) {
      this.instance.destroy()
      this.instance = undefined
    }
  }

  update() {
    if (this.instance !== undefined) {
      this.instance.update()
    }
  }
}
