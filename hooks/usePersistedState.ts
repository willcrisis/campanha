import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

export default function usePersistedState<T>(
  key: string,
  defaultValue?: T,
): [T, (value: T | ((state: T) => T)) => void, () => void] {
  const [state, setState] = useState<T>(defaultValue!);

  const loadInitialValue = useCallback(async () => {
    const storageValue = await AsyncStorage.getItem(key);
    if (storageValue) {
      const parsedValue = JSON.parse(storageValue);
      setState(parsedValue);
      return;
    }
  }, [key]);

  useEffect(() => {
    loadInitialValue();
  }, [loadInitialValue]);

  const setPersistedState: typeof setState = useCallback(
    (value) => {
      setState(value);
      try {
        AsyncStorage.setItem(key, JSON.stringify(value));
      } catch (err) {
        console.error(err);
      }
    },
    [key],
  );

  const clearPersistedState = useCallback(() => {
    setState(defaultValue!);
    try {
      AsyncStorage.removeItem(key);
    } catch (err) {
      console.error(err);
    }
  }, [defaultValue, key]);

  return [state, setPersistedState, clearPersistedState];
}
