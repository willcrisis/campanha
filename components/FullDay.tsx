import { Dia, Semana } from '@/contexts/DataContext';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Book } from './Scriptures';
import { Copyright } from './Copyright';
import InputLabel from './inputs/InputLabel';
import { FontControls, useAccessibility } from '@/contexts/AccessibilityContext';
import { useI18n } from '@/contexts/I18nContext';
type Props = {
  week: Semana;
  day: Dia;
};

const FullDay = ({ week, day }: Props) => {
  const { fontSize } = useAccessibility();
  const { translate, ordinal } = useI18n();

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <ScrollView contentContainerStyle={{ paddingTop: 60, alignItems: 'center', gap: 24 }}>
        <InputLabel>
          {translate('components.fullDay.week', {
            week: ordinal(week.id),
            theme: week.tema,
          })}
        </InputLabel>
        <InputLabel>{translate(`weekDays.${day.id}`)}</InputLabel>
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
          {translate('components.fullDay.attribute', {
            attribute: day.atributo,
          })}
        </Text>
        <InputLabel size="xl">{day.textos}</InputLabel>
        {day.livros.map((book) => (
          <Book key={book.nome} book={book} />
        ))}
        <Copyright />
      </ScrollView>
      <FontControls />
    </View>
  );
};

export default FullDay;
