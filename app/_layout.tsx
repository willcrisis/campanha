import DataContextProvider from '@/contexts/DataContext';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';

const theme: typeof MD3DarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: '#000000',
  },
};

export default function RootLayout() {
  useFonts({
    GreatVibes: require('../assets/fonts/GreatVibes-Regular.ttf'),
  });

  return (
    <DataContextProvider>
      <PaperProvider theme={theme}>
        <Stack screenOptions={{ headerShown: false }} />
      </PaperProvider>
    </DataContextProvider>
  );
}
