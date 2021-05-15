import React, { useState } from 'react';

export interface InputProps {
  secretWord: string;
  success: boolean;
}

const Input: React.FC<InputProps> = ({ secretWord, success }) => {
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
          placeholder='Enter guess'
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default Input;
