export const toggleTabPanel = (targetRoot: HTMLElement, eventTarget: EventTarget | null, callback?: () => void) => {
  if (!eventTarget) return
  if (!(eventTarget instanceof HTMLElement)) return

  const targetPanel = eventTarget.getAttribute("aria-controls")
  const activeTab = targetRoot.querySelector<HTMLElement>('[data-current="true"]')
  const activeContent = targetRoot.querySelector<HTMLElement>('[aria-hidden="false"]')

  if (!activeTab || !activeContent) return

  activeTab.dataset.current = "false"
  eventTarget.dataset.current = "true"

  activeTab.dataset.current = "false"
  eventTarget.dataset.current = "true"

  activeContent.setAttribute("aria-hidden", "true")
  targetRoot.querySelector(`#${targetPanel || "untethered"}`)?.setAttribute("aria-hidden", "false")

  if (callback) callback()
}
