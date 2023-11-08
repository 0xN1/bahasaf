// regex to match syllables in malay/indo language
// https://stackoverflow.com/questions/61722412/what-must-be-corrected-in-this-regex-to-extract-pronunciation-from-the-indonesia
// https://regex101.com/r/Mi5yRL/6 by Wiktor Stribiżew
export const encodeText = (text: string, substituteChar: string) => {
  const regex =
    /(?:kh|n[yg]|sy|[bcdfghjklmnpqrstvwxyz])*(?:a(?:[iu](?!(?:kh|n[yg]|sy|[bcdfghjklmnpqrstvwxyz])+\b))?|o(?:i(?!(?:kh|n[yg]|sy|[bcdfghjklmnpqrstvwxyz])+\b))?|[aeiou])(?:(?:kh|n[yg]|sy|[bcdfghjklmnpqrstvwxyz])*(?=[^a-zA-Z]|$)|(?=(kh|n[yg]|sy|[bcdfghjklmnpqrstvwxyz]))\1(?=kh|n[yg]|sy|[bcdfghjklmnpqrstvwxyz]))?/gim;

  // match syllables
  const syllables = text.match(regex) as string[];

  // repeat each of the syllable and replace first character with 'f'
  const moddedSyllables = syllables?.map((word) => {
    // if word starts with 'ng' / 'ny' / 'kh' / 'sy', replace with 'f'.
    // might need to add more, but this is the most common one.
    // eg: 'ng' -> 'f'
    if (word.match(/^(ng|ny|kh|sy)/)) {
      // replace first 2 characters with 'f'
      return word.concat(word.replace(word.slice(0, 2), substituteChar));
    }
    // if word starts with vowel, prepend 'f'
    if (word.match(/^[aeiou]/)) {
      return word.concat(substituteChar + word);
    }
    return word.concat(word.replace(word[0], substituteChar));
  });

  const result = moddedSyllables?.join(" ");
  return result;
};
