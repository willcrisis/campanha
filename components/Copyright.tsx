import { Text } from 'react-native-paper';
import { useI18n } from '@/contexts/I18nContext';

export const Copyright = () => {
  const { translate } = useI18n();
  return (
    <Text style={{ fontSize: 10, color: '#777777', marginTop: 40, textAlign: 'center' }}>
      {translate('components.copyright.text')}
    </Text>
  );
};
