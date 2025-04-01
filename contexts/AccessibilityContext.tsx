import usePersistedState from '@/hooks/usePersistedState';
import { createContext, useContext } from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';

type AccessibilityContextType = {
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextType>({
  fontSize: 16,
  increaseFontSize: () => {},
  decreaseFontSize: () => {},
});

const AccessibilityProvider = ({ children }: { children: React.ReactNode }) => {
  const [fontSize, setFontSize] = usePersistedState('fontSize', 16);

  const increaseFontSize = () => {
    setFontSize(Math.min(fontSize + 2, 32));
  };

  const decreaseFontSize = () => {
    setFontSize(Math.max(fontSize - 2, 12));
  };

  return (
    <AccessibilityContext.Provider value={{ fontSize, increaseFontSize, decreaseFontSize }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);

export const FontControls = () => {
  const { increaseFontSize, decreaseFontSize } = useAccessibility();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
      <IconButton icon="format-font-size-decrease" onPress={decreaseFontSize} />
      <IconButton icon="format-font-size-increase" onPress={increaseFontSize} />
    </View>
  );
};

export default AccessibilityProvider;
