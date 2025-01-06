import FullDay from '@/components/FullDay';
import PageHeader from '@/components/PageHeader';
import PageView from '@/components/PageView';
import { useData } from '@/contexts/DataContext';
import { useShare } from '@/hooks/share';
import { IconButton } from 'react-native-paper';

const HomePage = () => {
  const { thisWeek, today } = useData();
  const { share } = useShare();
  return (
    <PageView>
      <PageHeader
        leftAction={<IconButton icon="menu" />}
        rightAction={<IconButton icon="share" onPress={() => share(Number(thisWeek.id), Number(today.id))} />}
      />
      <FullDay week={thisWeek} day={today} />
    </PageView>
  );
};

export default HomePage;
