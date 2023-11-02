import Swiper, { Navigation, Scrollbar, Pagination, SwiperOptions, A11y } from "swiper"

import { Dropdown } from "../dropdown"
import { escapeString } from "../utility"

import "swiper/css/scrollbar"

class SingleSliderWithDropdownFilter extends Dropdown {
  readonly sliderRoot!: HTMLElement

  readonly sliders!: NodeListOf<HTMLElement>

  slider: Swiper | undefined

  constructor(
    dropdownProps: Pick<Dropdown, "targetRoot" | "triggerButton" | "categoryList" | "categoryItems">,
    sliderProps: Pick<SingleSliderWithDropdownFilter, "sliderRoot" | "sliders">
  ) {
    super(dropdownProps)

    Object.assign(this, sliderProps)

    this.slider = undefined

    this.initSlider()
  }

  protected handleChangeItem(event: Event, item: HTMLElement) {
    event.stopPropagation()
    this.initList(item)

    if (!(event.target instanceof HTMLElement)) return

    const currentCategory = event.target.dataset.category

    if (currentCategory === undefined) return

    for (const sliderItem of this.sliders) {
      const categories = sliderItem.dataset.category
      if (!categories) continue

      sliderItem.dataset.hidden = categories.includes(currentCategory) ? "false" : "true"
    }

    this.slider?.destroy()

    this.slider = new Swiper(`.js-spot-slider-${escapeString(currentCategory)}`, this.getSliderOption(currentCategory))
  }

  private getSliderOption(category: string): SwiperOptions {
    const escapedCategory = escapeString(category)
    return {
      modules: [A11y, Navigation, Scrollbar, Pagination],
      centeredSlides: true,
      slidesPerView: 1.4,
      speed: 500,
      loop: false,
      navigation: {
        nextEl: `.js-spot-slider-${escapedCategory}-next`,
        prevEl: `.js-spot-slider-${escapedCategory}-prev`,
      },
      pagination: {
        el: `.js-spot-slider-${escapedCategory}-pagination`,
        type: "fraction",
      },
      scrollbar: {
        el: `.js-spot-slider-${escapedCategory}-scrollbar`,
        draggable: true,
      },
      a11y: {
        prevSlideMessage: "Back to previous slide",
        nextSlideMessage: "Go to next slide",
      },
    }
  }

  private initSlider() {
    const categories = this.sliderRoot.dataset.categories
    if (categories === undefined) return
    const categoriesArray = categories.split(",")
    const category = categoriesArray[0]
    this.slider = new Swiper(`.js-spot-slider-${escapeString(category)}`, this.getSliderOption(category))

    const params = new URLSearchParams(window.location.search)
    const categoryParam = params.get("category")

    if (!categoryParam) return

    for (const item of this.categoryItems) {
      if (categoryParam === item.dataset.category) {
        const currentCategory = categoryParam

        if (currentCategory === undefined) continue

        for (const sliderItem of this.sliders) {
          const categories = sliderItem.dataset.category
          if (!categories) continue

          sliderItem.dataset.hidden = categories.includes(currentCategory) ? "false" : "true"
        }

        this.slider?.destroy()

        this.slider = new Swiper(
          `.js-spot-slider-${escapeString(currentCategory)}`,
          this.getSliderOption(currentCategory)
        )
      }
    }
  }
}

export const spotSliderWithDropdownFilter = () => {
  const targetRoot = document.querySelector<HTMLElement>("#js-category-dropDown")

  if (!targetRoot) return

  const triggerButton = targetRoot.querySelector<HTMLElement>(".js-trigger-button")

  const categoryList = targetRoot.querySelector<HTMLElement>(".js-category-list")

  const categoryItems = targetRoot.querySelectorAll<HTMLElement>(".js-category-item")

  if (!triggerButton || !categoryList || !categoryItems) return

  const sliderRoot = document.querySelector<HTMLElement>("#js-slider-with-filter")

  const sliders = document.querySelectorAll<HTMLElement>(".js-spot-slider")

  if (!sliderRoot || !sliders) return

  new SingleSliderWithDropdownFilter(
    {
      // dropdownProps
      targetRoot,
      triggerButton,
      categoryList,
      categoryItems,
    },
    {
      // sliderProps
      sliderRoot,
      sliders,
    }
  )
}
