import DataContextProvider from '@/contexts/DataContext';
import * as SplashScreen from 'expo-splash-screen';
import { GreatVibes_400Regular, useFonts } from '@expo-google-fonts/great-vibes';
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { useEffect } from 'react';
import { Stack } from 'expo-router';

SplashScreen.preventAutoHideAsync();

const theme: typeof MD3DarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: '#000000',
    primary: '#ffffff',
  },
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    GreatVibes_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <DataContextProvider>
      <PaperProvider theme={theme}>
        <Stack screenOptions={{ headerShown: false }} />
      </PaperProvider>
    </DataContextProvider>
  );
}
