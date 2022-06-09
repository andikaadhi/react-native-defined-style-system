import { useContext } from 'react';
import { DefinedSystemContext } from '../contexts/DefinedSystem';

const useTheme = () => {
  const { theme } = useContext(DefinedSystemContext);

  return theme;
};

export default useTheme;
