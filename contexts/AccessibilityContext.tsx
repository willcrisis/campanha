import usePersistedState from '@/hooks/usePersistedState';
import { createContext, useContext } from 'react';
import { View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

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
  const theme = useTheme();
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        right: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: theme.colors.background,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        gap: 10,
      }}
    >
      <IconButton icon="format-font-size-decrease" onPress={decreaseFontSize} />
      <IconButton icon="format-font-size-increase" onPress={increaseFontSize} />
    </View>
  );
};

export default AccessibilityProvider;
