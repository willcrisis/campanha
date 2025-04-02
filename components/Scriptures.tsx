import { Capitulo, Livro, Versiculo } from '@/contexts/DataContext';
import { View } from 'react-native';
import InputLabel from './inputs/InputLabel';

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

const Chapter = ({ chapter }: ChapterProps) => (
  <View style={{ gap: 8 }}>
    <InputLabel bold>Capítulo {chapter.id}</InputLabel>
    {chapter.versiculos.map((verse) => (
      <Verse key={verse.id} verse={verse} />
    ))}
  </View>
);

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
