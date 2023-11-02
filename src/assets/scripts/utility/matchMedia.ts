export type Size = "sm" | "md" | "lg" | "xl"

export const matchMedia = (size: Size = "md") => {
  switch (size) {
    case "sm": {
      return window.matchMedia("(min-width: 640px)")
    }
    case "md": {
      return window.matchMedia("(min-width: 768px)")
    }
    case "lg": {
      return window.matchMedia("(min-width: 1024px)")
    }
    case "xl": {
      return window.matchMedia("(min-width: 1280px)")
    }
    default: {
      return window.matchMedia("(min-width: 0px)")
    }
  }
}
