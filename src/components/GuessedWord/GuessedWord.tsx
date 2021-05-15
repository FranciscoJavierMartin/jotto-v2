import React from 'react';

export interface GuessedWordProps {
  guessedWords: {
    guessedWord: string;
    letterMatchCount: number;
  }[];
}

const GuessedWord: React.FC<GuessedWordProps> = ({ guessedWords }) => {
  return (
    <div data-test='component-guessed-words'>
      {guessedWords.length > 0 ? (
        <div data-test='guessed-words'>
          <h3>Guessed Words</h3>
          <table className='table table-sm table-light table-striped'>
            <thead>
              <tr>
                <th>Guess</th>
                <th>Matching Letters</th>
              </tr>
            </thead>
            <tbody>
              {guessedWords.map((word, index) => (
                <tr key={index} data-test='guessed-word'>
                  <td>{word.guessedWord}</td>
                  <td>{word.letterMatchCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <span data-test='guess-instructions'>
          Try to guess the secret word!
        </span>
      )}
    </div>
  );
};

export default GuessedWord;
