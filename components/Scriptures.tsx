import { Capitulo, Livro, Versiculo } from '@/contexts/DataContext';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

type VerseProps = {
  verse: Versiculo;
};

const Verse = ({ verse }: VerseProps) => (
  <Text style={{ textAlign: 'justify' }}>
    {verse.id} {verse.texto}
  </Text>
);

type ChapterProps = {
  chapter: Capitulo;
};

const Chapter = ({ chapter }: ChapterProps) => (
  <View style={{ gap: 8 }}>
    <Text variant="titleSmall">Capítulo {chapter.id}</Text>
    {chapter.versiculos.map((verse) => (
      <Verse key={verse.id} verse={verse} />
    ))}
  </View>
);

type BookProps = {
  book: Livro;
};

export const Book = ({ book }: BookProps) => (
  <View style={{ paddingHorizontal: 8, gap: 8 }}>
    <Text variant="titleMedium">{book.nome}</Text>
    {book.capitulos.map((chapter) => (
      <Chapter key={chapter.id} chapter={chapter} />
    ))}
  </View>
);
