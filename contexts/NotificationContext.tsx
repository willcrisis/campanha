import usePersistedState from '@/hooks/usePersistedState';
import Constants from 'expo-constants';
import { isDevice } from 'expo-device';
import {
  SchedulableTriggerInputTypes,
  scheduleNotificationAsync,
  setNotificationHandler,
  cancelScheduledNotificationAsync,
  setNotificationChannelAsync,
  AndroidImportance,
  getPermissionsAsync,
  requestPermissionsAsync,
  getExpoPushTokenAsync,
} from 'expo-notifications';
import { createContext, useCallback, useContext, useEffect } from 'react';
import { Platform } from 'react-native';

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await setNotificationChannelAsync('default', {
      name: 'default',
      importance: AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (isDevice) {
    const { status: existingStatus } = await getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid

    if (Constants.easConfig?.projectId) {
      token = (
        await getExpoPushTokenAsync({
          projectId: Constants.easConfig.projectId, // you can hard code project id if you dont want to use expo Constants
        })
      ).data;
      console.info(token);
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

type NotificationContextType = {
  notificationTime?: { id: string; hour: number; minute: number };
  scheduleNotification: (hour: number, minute: number) => Promise<void>;
  cancelNotification: () => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType>({
  notificationTime: undefined,
  scheduleNotification: async () => {},
  cancelNotification: async () => {},
});

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notificationTime, setNotificationTime, clearNotificationTime] = usePersistedState<
    { id: string; hour: number; minute: number } | undefined
  >('notificationTime');

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const scheduleNotification = useCallback(async (hour: number, minute: number) => {
    try {
      if (notificationTime) {
        await cancelNotification();
      }

      const notificationId = await scheduleNotificationAsync({
        content: {
          title: 'É hora da Campanha de Louvor',
          body: 'Comece seu dia na presença do Senhor',
        },
        trigger: {
          type: SchedulableTriggerInputTypes.DAILY,
          hour,
          minute,
        },
      });
      console.info('Notification scheduled', notificationId, hour, minute);

      setNotificationTime({
        id: notificationId,
        hour,
        minute,
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const cancelNotification = useCallback(async () => {
    if (!notificationTime) return;
    await cancelScheduledNotificationAsync(notificationTime.id);
    console.info('Notification cancelled');
    clearNotificationTime();
  }, [notificationTime]);

  return (
    <NotificationContext.Provider
      value={{
        notificationTime,
        scheduleNotification,
        cancelNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);

export default NotificationProvider;
