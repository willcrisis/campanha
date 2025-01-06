import FullDay from '@/components/FullDay';
import PageView from '@/components/PageView';
import { useData } from '@/contexts/DataContext';

const HomePage = () => {
  const { thisWeek, today } = useData();
  return (
    <PageView>
      <FullDay week={thisWeek} day={today} />
    </PageView>
  );
};

export default HomePage;
