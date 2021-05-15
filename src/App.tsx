import React from 'react';
import Congrats from './components/Congrats/Congrats';
import GuessedWord from './components/GuessedWord/GuessedWord';

function App() {
  return (
    <div className='container'>
      <h1>Jotto</h1>
      <Congrats success={true} />
      <GuessedWord
        guessedWords={[
          {
            guessedWord: 'train',
            letterMatchCount: 3,
          },
        ]}
      />
    </div>
  );
}

export default App;
