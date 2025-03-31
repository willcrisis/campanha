import DataContextProvider from '@/contexts/DataContext';
import * as SplashScreen from 'expo-splash-screen';
import { GreatVibes_400Regular, useFonts } from '@expo-google-fonts/great-vibes';
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

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
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer
            screenOptions={{
              headerShown: false,
              drawerStyle: {
                backgroundColor: theme.colors.background,
              },
              drawerActiveBackgroundColor: theme.colors.surfaceDisabled,
              drawerActiveTintColor: theme.colors.primary,
              drawerInactiveTintColor: theme.colors.secondary,
            }}
          >
            <Drawer.Screen
              name="index"
              options={{
                drawerLabel: 'Hoje',
                title: 'Hoje',
              }}
            />
            <Drawer.Screen
              name="search"
              options={{
                drawerLabel: 'Pesquisar',
                title: 'Pesquisar',
              }}
            />
            <Drawer.Screen
              name="config"
              options={{
                drawerLabel: 'Configurações',
                title: 'Configurações',
              }}
            />
          </Drawer>
        </GestureHandlerRootView>
      </PaperProvider>
    </DataContextProvider>
  );
}
