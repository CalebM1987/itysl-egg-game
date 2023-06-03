export const toTitleCase = (s: string)=> s.split(' ').map(function(word) {
    return word.charAt(0).toUpperCase() + word.substring(1, word.length);
  })
  .join(' ')