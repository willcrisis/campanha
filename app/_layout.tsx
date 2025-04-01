import 'expo-dev-client';
import DataContextProvider from '@/contexts/DataContext';
import * as SplashScreen from 'expo-splash-screen';
import { GreatVibes_400Regular, useFonts } from '@expo-google-fonts/great-vibes';
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import NotificationProvider from '@/contexts/NotificationContext';
import { pt, registerTranslation } from 'react-native-paper-dates';

registerTranslation('pt', pt);

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
    <PaperProvider theme={theme}>
      <DataContextProvider>
        <NotificationProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </NotificationProvider>
      </DataContextProvider>
    </PaperProvider>
  );
}
