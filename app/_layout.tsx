import 'expo-dev-client';
import DataContextProvider from '@/contexts/DataContext';
import * as SplashScreen from 'expo-splash-screen';
import { GreatVibes_400Regular, useFonts } from '@expo-google-fonts/great-vibes';
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import NotificationProvider from '@/contexts/NotificationContext';
import { pt, registerTranslation } from 'react-native-paper-dates';
import AccessibilityProvider from '@/contexts/AccessibilityContext';
registerTranslation('pt', pt);

SplashScreen.preventAutoHideAsync();

const theme: typeof MD3DarkTheme = {
  ...MD3DarkTheme,
  mode: 'exact',
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
          <AccessibilityProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </AccessibilityProvider>
        </NotificationProvider>
      </DataContextProvider>
    </PaperProvider>
  );
}
