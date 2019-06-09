export const shortenContent = (str, numOfWords) =>
  str.split(' ').slice(0, numOfWords).join(' ')