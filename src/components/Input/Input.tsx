import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export interface InputProps {
  secretWord: string;
}

const Input: React.FC<InputProps> = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const success = useSelector((state) => state.success);

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
