/**
 * @function getLetterMatchCount
 * @param {string} guessedWord - Guessed Word
 * @param {string} secretWord - Secret word
 * @returns {number} - Number of letters matched between guessed word an secret word.
 */
export function getLetterMatchCount(
  guessedWord: string,
  secretWord: string
): number {
  const secretLetters = secretWord.split('');
  const guessedLetterSet = new Set(guessedWord);
  return secretLetters.filter((letter) => guessedLetterSet.has(letter)).length;
}
