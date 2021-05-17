import React, { useState } from 'react';
import LanguageContext from '../../contexts/LanguageContext';
import SuccessContext from '../../contexts/SuccessContext';
import stringsModule from '../../helpers/strings';

export interface InputProps {
  secretWord: string;
}

const Input: React.FC<InputProps> = ({ secretWord }) => {
  const [success] = SuccessContext.useSuccess();
  const language = React.useContext(LanguageContext);
  const [currentGuess, setCurrentGuess] = useState<string>('');

  return success ? (
    <div data-test='component-input' />
  ) : (
    <div data-test='component-input'>
      <form className='form-inline'>
        <input
          data-test='input-box'
          className='mb-2 mx-sm-3'
          type='text'
          placeholder={stringsModule.getStringByLanguage(
            language,
            'guessInputPlaceholder'
          )}
          value={currentGuess}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setCurrentGuess(event.target.value)
          }
        />
        <button
          data-test='submit-button'
          className='btn btn-primary mb-2'
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.preventDefault();
            setCurrentGuess('');
          }}
        >
          {stringsModule.getStringByLanguage(language, 'submit')}
        </button>
      </form>
    </div>
  );
};

export default Input;
