import React from 'react';

export interface CongratsProps {
  success?: boolean;
}

const Congrats: React.FC<CongratsProps> = ({ success }) => {
  return (
    <div data-test='component-congrats' className='alert alert-success'>
      {success && (
        <span data-test='congrats-message'>
          Congratulations! You guessed the word!
        </span>
      )}
    </div>
  );
};

export default Congrats;
