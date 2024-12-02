import DataContextProvider from '@/contexts/DataContext';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  useFonts({
    GreatVibes: require('../assets/fonts/GreatVibes-Regular.ttf'),
  });
  return (
    <DataContextProvider>
      <PaperProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </PaperProvider>
    </DataContextProvider>
  );
}
