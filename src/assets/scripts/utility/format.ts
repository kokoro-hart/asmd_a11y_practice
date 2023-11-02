export const escapeString = (selector: string) => {
  return selector.replaceAll(/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g, "\\$&")
}
