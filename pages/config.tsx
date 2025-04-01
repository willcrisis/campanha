import Switch from '@/components/inputs/Switch';
import TimePicker from '@/components/inputs/TimePicker';
import PageHeader from '@/components/PageHeader';
import PageView from '@/components/PageView';
import { useNotification } from '@/contexts/NotificationContext';
import { useState } from 'react';

const ConfigPage = () => {
  const { notificationTime, scheduleNotification, cancelNotification } = useNotification();
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(notificationTime !== undefined);

  return (
    <PageView>
      <PageHeader title="Configurações" />
      <Switch
        label="Ser notificado todos os dias"
        value={isNotificationEnabled}
        onValueChange={() => {
          setIsNotificationEnabled((prev) => {
            if (prev) {
              cancelNotification();
            } else {
              scheduleNotification(notificationTime?.hour || 7, notificationTime?.minute || 0);
            }
            return !prev;
          });
        }}
      />
      {isNotificationEnabled && (
        <TimePicker
          label="Hora da notificação"
          hours={notificationTime?.hour || 7}
          minutes={notificationTime?.minute || 0}
          onChange={(hours, minutes) => {
            scheduleNotification(hours, minutes);
          }}
        />
      )}
    </PageView>
  );
};

export default ConfigPage;
