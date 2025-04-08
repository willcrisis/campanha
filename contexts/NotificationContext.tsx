import Constants from 'expo-constants';
import { isDevice } from 'expo-device';
import {
  SchedulableTriggerInputTypes,
  scheduleNotificationAsync,
  setNotificationHandler,
  setNotificationChannelAsync,
  AndroidImportance,
  getPermissionsAsync,
  requestPermissionsAsync,
  getExpoPushTokenAsync,
  cancelAllScheduledNotificationsAsync,
  getAllScheduledNotificationsAsync,
  CalendarNotificationTrigger,
} from 'expo-notifications';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function registerForPushNotificationsAsync(
  setNotificationTime: (notificationTime: NotificationTime) => void,
) {
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

    getAllScheduledNotificationsAsync().then((notifications) => {
      const notificationTime = (notifications[0].trigger as CalendarNotificationTrigger).dateComponents;
      setNotificationTime({
        id: notifications[0].identifier,
        hour: notificationTime.hour!,
        minute: notificationTime.minute!,
      });
    });
  } else {
    console.warn('Must use physical device for Push Notifications');
  }

  return token;
}

type NotificationTime = {
  id: string;
  hour: number;
  minute: number;
};

type NotificationContextType = {
  notificationTime?: NotificationTime;
  scheduleNotification: (hour: number, minute: number) => Promise<void>;
  cancelNotification: () => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType>({
  notificationTime: undefined,
  scheduleNotification: async () => {},
  cancelNotification: async () => {},
});

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notificationTime, setNotificationTime] = useState<NotificationTime>();

  useEffect(() => {
    registerForPushNotificationsAsync(setNotificationTime);
  }, []);

  const scheduleNotification = useCallback(
    async (hour: number, minute: number) => {
      try {
        if (notificationTime) {
          await cancelAllScheduledNotificationsAsync();
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
    },
    [notificationTime],
  );

  const cancelNotification = useCallback(async () => {
    if (!notificationTime) return;
    await cancelAllScheduledNotificationsAsync();
    console.info('Notification cancelled');
    setNotificationTime(undefined);
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
