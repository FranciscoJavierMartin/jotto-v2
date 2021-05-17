import React from 'react';
import LanguageContext from '../../contexts/LanguageContext';
import SuccessContext from '../../contexts/SuccessContext';
import stringsModule from '../../helpers/strings';

export interface CongratsProps {}

const Congrats: React.FC<CongratsProps> = () => {
  const [success] = SuccessContext.useSuccess();
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
