import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../interfaces/state';
import { guessWord } from '../../actions';

export interface InputProps {}

const Input: React.FC<InputProps> = () => {
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const success = useSelector<RootState>((state) => state.success);
  const dispatch = useDispatch();

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
            dispatch(guessWord(currentGuess));
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
