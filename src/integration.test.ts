import { storeFactory } from './test/testUtils';
import { guessWord } from './actions';
import { RootState } from './interfaces/state';
import { IGuessedWord } from './interfaces/guessedWord';

describe('guessWord action dispatcher', () => {
  const secretWord: string = 'party';
  const unsuccessfulGuess = 'train';

  describe('no guessed words', () => {
    let store: any;
    const initialState: RootState = {
      secretWord,
      guessedWords: [],
      success: false,
    };

    beforeEach(() => {
      store = storeFactory(initialState);
    });

    test('updates state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord(unsuccessfulGuess));
      const expectedState: RootState = {
        ...initialState,
        success: false,
        guessedWords: [
          {
            guessedWord: unsuccessfulGuess,
            letterMatchCount: 3,
          },
        ],
      };
      const newState = store.getState();
      expect(newState).toEqual(expectedState);
    });

    test('updates state correctly for successful guess', () => {
      store.dispatch(guessWord(secretWord));
      const expectedState: RootState = {
        secretWord,
        success: true,
        guessedWords: [
          {
            guessedWord: secretWord,
            letterMatchCount: secretWord.length,
          },
        ],
      };
      const newState = store.getState();
      expect(newState).toEqual(expectedState);
    });
  });

  describe('some guessed words', () => {
    const guessedWords: IGuessedWord[] = [
      {
        guessedWord: 'agile',
        letterMatchCount: 1,
      },
    ];
    const initialState: RootState = {
      guessedWords,
      secretWord,
      success: false,
    };
    let store: any;

    beforeEach(() => {
      store = storeFactory(initialState);
    });

    test('updates state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord(unsuccessfulGuess));
      const newState = store.getState();
      const expectedState: RootState = {
        secretWord,
        success: false,
        guessedWords: [
          ...guessedWords,
          { guessedWord: unsuccessfulGuess, letterMatchCount: 3 },
        ],
      };
      expect(newState).toEqual(expectedState);
    });

    test('updates state correctly for successful guess', () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();
      const expectedState: RootState = {
        secretWord,
        success: true,
        guessedWords: [
          ...guessedWords,
          { guessedWord: secretWord, letterMatchCount: secretWord.length },
        ],
      };
      expect(newState).toEqual(expectedState);
    });
  });
});
