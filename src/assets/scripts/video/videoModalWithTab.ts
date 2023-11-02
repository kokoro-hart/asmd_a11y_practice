import MicroModal from "micromodal"

import { toggleTabPanel } from "../tab/tab"

class VideoModalWithTab {
  readonly targetRoots!: NodeListOf<HTMLElement>

  readonly allVideoElements!: NodeListOf<HTMLVideoElement>

  constructor(props: Pick<VideoModalWithTab, "targetRoots" | "allVideoElements">) {
    Object.assign(this, props)

    this.initModal()
    this.setDefaultCurrentTab()
    this.registerEvents()
  }

  private initModal() {
    MicroModal.init({
      disableScroll: true,
      disableFocus: false,
      openClass: "is-open",
      awaitCloseAnimation: true,
      awaitOpenAnimation: true,
      onClose: (modal) => {
        this.initVideoTab(modal)
        this.pauseOtherVideos()
      },
    })
  }

  private registerEvents() {
    for (const target of this.targetRoots) {
      const tabs = target.querySelectorAll('[role="tab"]')
      if (!target || !tabs) continue

      for (const tab of tabs) {
        tab.addEventListener("click", (event) => {
          toggleTabPanel(target, event.target, () => this.pauseOtherVideos())
        })
      }
    }
  }

  private setDefaultCurrentTab() {
    const videoTab = document.querySelector<HTMLElement>("#video-modal .js-video-tab")
    if (!videoTab) return
    const modalTriggers = document.querySelectorAll<HTMLElement>("[data-select-videotab]")

    for (const modalTrigger of modalTriggers) {
      modalTrigger.addEventListener("click", (event) => {
        if (!event.currentTarget) return
        if (!(event.currentTarget instanceof HTMLElement)) return
        const selectVideoTabIndex = event.currentTarget.dataset.selectVideotab
        const selectVideoTab = videoTab.querySelector(`[role="tab"][aria-controls="tabPanel${selectVideoTabIndex}"]`)
        toggleTabPanel(videoTab, selectVideoTab)
      })
    }
  }

  private initVideoTab(targetModal: HTMLElement | undefined) {
    if (!targetModal) return

    const videoTab = targetModal.querySelector<HTMLElement>(".js-video-tab")
    const defaultCurrentTab = targetModal.querySelector<HTMLElement>('[data-default-current="true"]')

    if (!videoTab || !defaultCurrentTab) return

    toggleTabPanel(videoTab, defaultCurrentTab)
  }

  private pauseOtherVideos() {
    for (const element of this.allVideoElements) {
      element.pause()
      element.currentTime = 0
    }
  }
}

export const videoModalWithTab = () => {
  const targetRoots = document.querySelectorAll<HTMLElement>(".js-video-tab")
  const allVideoElements = document.querySelectorAll<HTMLVideoElement>(".js-tab-with-video")

  if (!targetRoots || !allVideoElements) return

  new VideoModalWithTab({ targetRoots, allVideoElements })
}
