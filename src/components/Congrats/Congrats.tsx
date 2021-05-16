import React from 'react';
import LanguageContext from '../../contexts/LanguageContext';
import stringsModule from '../../helpers/strings';

export interface CongratsProps {
  success?: boolean;
}

const Congrats: React.FC<CongratsProps> = ({ success }) => {
  const language = React.useContext(LanguageContext);
  return success ? (
    <div data-test='component-congrats' className='alert alert-success'>
      {success && (
        <span data-test='congrats-message'>
          {stringsModule.getStringByLanguage(language, 'congrats')}
        </span>
      )}
    </div>
  ) : (
    <div data-test='component-congrats' />
  );
};

export default Congrats;
