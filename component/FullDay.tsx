import { Dia, Semana, WEEK_DAY_MAP } from '@/contexts/DataContext';
import { ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Book } from './Scriptures';

type Props = {
  week: Semana;
  day: Dia;
};

const FullDay = ({ week, day }: Props) => (
  <>
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: 'center', paddingTop: 16, gap: 24 }}>
      <Text>
        {week.id}ª Semana: {week.tema}
      </Text>
      <Text>{WEEK_DAY_MAP[Number(day.id)]}</Text>
      <Text
        variant="displayLarge"
        style={{ fontFamily: 'GreatVibes', textAlign: 'center', paddingTop: 4, color: '#dac132' }}
      >
        Deus Pai, {day.atributo}
      </Text>
      <Text variant="titleLarge">{day.textos}</Text>
      {day.livros.map((book) => (
        <Book key={book.nome} book={book} />
      ))}
    </ScrollView>
  </>
);

export default FullDay;
