import React from 'react';

const SuccessContext = React.createContext<boolean>(false);

/**
 * @function useSuccess
 * @returns {Array} SuccessContext value, which is a state of [value, setter]
 */
function useSuccess() {
  const context = React.useContext(SuccessContext);

  if (!context) {
    throw new Error('useSuccess must be used within SuccessProvider');
  }

  return context;
}

/**
 * @function SuccessProvider
 * @param {object} props - Props to pass through from declared component
 * @returns {JSX.Element} Provider component
 */
function SuccessProvider(props: any) {
  const [success, setSuccess] = React.useState<boolean>(false);

  const value = React.useMemo(() => [success, setSuccess], [success]);

  return <SuccessContext.Provider value={value} {...props} />;
}

export default {
  SuccessProvider,
  useSuccess,
};
