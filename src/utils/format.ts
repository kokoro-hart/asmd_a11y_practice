export const toUpperCamelCase = (input: string) => {
  const words = input.split(/[ _-]/)

  const upperCamelCaseWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  })

  const upperCamelCaseString = upperCamelCaseWords.join("")

  return upperCamelCaseString
}

export const removeSymbols = (inputString: string, symbols = "&") => {
  // 指定された記号と空白文字を正規表現で一括削除
  const regex = new RegExp(`[${symbols}\\s]`, "g")
  return inputString.replace(regex, "")
}
