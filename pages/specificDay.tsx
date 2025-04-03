import FullDay from '@/components/FullDay';
import PageHeader from '@/components/PageHeader';
import PageView from '@/components/PageView';
import { Dia, Semana, useData } from '@/contexts/DataContext';
import { useShare } from '@/hooks/share';
import { IconButton } from 'react-native-paper';
import { router } from 'expo-router';
type Props = {
  week: number;
  day: number;
};

const SpecificDayPage = ({ week, day }: Props) => {
  const { allData } = useData();
  const { share } = useShare();
  const weekData = allData[week - 1] as unknown as Semana;
  const dayData = weekData.dias[day - 1] as unknown as Dia;
  return (
    <PageView>
      <PageHeader
        leftAction={<IconButton icon="arrow-left" onPress={() => router.back()} />}
        rightAction={<IconButton icon="share" onPress={() => share(week, day)} />}
      />
      <FullDay week={weekData} day={dayData} />
    </PageView>
  );
};

export default SpecificDayPage;
