import { Dia, Semana, WEEK_DAY_MAP } from '@/contexts/DataContext';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Book } from './Scriptures';
import { Copyright } from './Copyright';
import InputLabel from './inputs/InputLabel';
import { FontControls, useAccessibility } from '@/contexts/AccessibilityContext';

type Props = {
  week: Semana;
  day: Dia;
};

const FullDay = ({ week, day }: Props) => {
  const { fontSize } = useAccessibility();
  return (
    <ScrollView style={{ flex: 1 }}>
      <FontControls />
      <View style={{ paddingTop: 16, flex: 1, alignItems: 'center', gap: 24 }}>
        <InputLabel>
          {week.id}ª Semana: {week.tema}
        </InputLabel>
        <InputLabel>{WEEK_DAY_MAP[Number(day.id)]}</InputLabel>
        <Text
          style={{
            fontFamily: 'GreatVibes_400Regular',
            paddingTop: 4,
            paddingHorizontal: 10,
            color: '#dac132',
            textAlign: 'center',
            fontSize: fontSize * 4,
          }}
        >
          Deus Pai, {day.atributo}
        </Text>
        <InputLabel size="xl">{day.textos}</InputLabel>
        {day.livros.map((book) => (
          <Book key={book.nome} book={book} />
        ))}
        <Copyright />
      </View>
    </ScrollView>
  );
};

export default FullDay;
