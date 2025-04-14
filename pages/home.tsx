import FullDay from '@/components/FullDay';
import PageHeader from '@/components/PageHeader';
import PageView from '@/components/PageView';
import { useData } from '@/contexts/DataContext';
import { useShare } from '@/hooks/share';
import { useI18n } from '@/contexts/I18nContext';
import { router } from 'expo-router';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';

const HomePage = () => {
  const { thisWeek, today } = useData();
  const { share } = useShare();
  const { translate } = useI18n();

  return (
    <PageView>
      <PageHeader
        title={translate('pages.home.title')}
        leftAction={<IconButton icon="cog" onPress={() => router.push('/config')} />}
        rightAction={
          <View style={{ flexDirection: 'row', gap: 0 }}>
            <IconButton icon="magnify" onPress={() => router.push('/search')} />
            <IconButton icon="share" onPress={() => share(Number(thisWeek.id), Number(today.id))} />
          </View>
        }
      />
      <FullDay week={thisWeek} day={today} />
    </PageView>
  );
};

export default HomePage;
