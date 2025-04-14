import { Capitulo, Livro, Versiculo } from '@/contexts/DataContext';
import { View } from 'react-native';
import InputLabel from './inputs/InputLabel';
import { useI18n } from '@/contexts/I18nContext';

type VerseProps = {
  verse: Versiculo;
};

export const Verse = ({ verse }: VerseProps) => (
  <InputLabel style={{ textAlign: 'justify' }}>
    {verse.id} {verse.texto}
  </InputLabel>
);

type ChapterProps = {
  chapter: Capitulo;
};

const Chapter = ({ chapter }: ChapterProps) => {
  const { translate } = useI18n();
  return (
    <View style={{ gap: 8 }}>
      <InputLabel bold>{translate('components.fullDay.chapter', { chapter: chapter.id })}</InputLabel>
      {chapter.versiculos.map((verse) => (
        <Verse key={verse.id} verse={verse} />
      ))}
    </View>
  );
};

type BookProps = {
  book: Livro;
};

export const Book = ({ book }: BookProps) => (
  <View style={{ paddingHorizontal: 8, gap: 8, width: '100%' }}>
    <InputLabel size="lg" bold>
      {book.nome}
    </InputLabel>
    {book.capitulos.map((chapter) => (
      <Chapter key={chapter.id} chapter={chapter} />
    ))}
  </View>
);
