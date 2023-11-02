export const testPath = {
  isTop: (pathname: string) => /^\/$/.test(pathname),
  isBlog: (pathname: string) => /^\/blog\/?$/.test(pathname),
  isAbout: (pathname: string) => /^\/about\/?$/.test(pathname),
}
