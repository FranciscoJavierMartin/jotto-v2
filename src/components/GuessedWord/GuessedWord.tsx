import React from 'react';
import { IGuessedWord } from '../../interfaces/guessedWord';
import LanguageContext from '../../contexts/LanguageContext';
import stringsModule from '../../helpers/strings';

export interface GuessedWordProps {
  guessedWords: IGuessedWord[];
}

const GuessedWord: React.FC<GuessedWordProps> = ({ guessedWords }) => {
  const language = React.useContext(LanguageContext);
  return (
    <div data-test='component-guessed-words'>
      {guessedWords.length > 0 ? (
        <div data-test='guessed-words'>
          <h3>{stringsModule.getStringByLanguage(language, 'guessedWords')}</h3>
          <table className='table table-sm table-light table-striped'>
            <thead>
              <tr>
                <th>
                  {stringsModule.getStringByLanguage(
                    language,
                    'guessColumnHeader'
                  )}
                </th>
                <th>
                  {stringsModule.getStringByLanguage(
                    language,
                    'matchingLettersColumnHeader'
                  )}
                </th>
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
          {stringsModule.getStringByLanguage(language, 'guessPrompt')}
        </span>
      )}
    </div>
  );
};

export default GuessedWord;
