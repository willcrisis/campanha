import SpecificDayPage from '@/pages/specificDay';
import { useLocalSearchParams } from 'expo-router';

export default function SpecificDay() {
  const { weekAndDay } = useLocalSearchParams();
  const [week, day] = Array.isArray(weekAndDay) ? weekAndDay : weekAndDay.split('-');

  return <SpecificDayPage week={Number(week)} day={Number(day)} />;
}
