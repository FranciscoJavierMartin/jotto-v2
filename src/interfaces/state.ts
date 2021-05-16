import { IGuessedWord } from './guessedWord';

export interface RootState {
  secretWord: string;
  success: boolean;
  guessedWords: IGuessedWord[];
}
