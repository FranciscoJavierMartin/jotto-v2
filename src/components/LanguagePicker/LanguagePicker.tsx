import React from 'react';

interface LanguagePickerProps {
  setLanguage: any;
}

const LanguagePicker: React.FC<LanguagePickerProps> = ({ setLanguage }) => {
  const languages = [
    { code: 'en', symbol: '🇬🇧' },
    { code: 'emoji', symbol: '😊' },
  ];

  return (
    <div data-test='component-language-picker'>
      {languages.map((language) => (
        <span
          data-test='language-icon'
          key={language.code}
          onClick={() => setLanguage(language.code)}
        >
          {language.symbol}
        </span>
      ))}
    </div>
  );
};

export default LanguagePicker;
