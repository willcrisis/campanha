import { SearchableVersiculo } from '@/contexts/DataContext';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import InputLabel from './inputs/InputLabel';
import { Verse as VerseComponent } from './Scriptures';
import { useI18n } from '@/contexts/I18nContext';

const Verse = ({ versiculo }: { versiculo: SearchableVersiculo }) => {
  const { translate, ordinal } = useI18n();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/${versiculo.semana}-${versiculo.dia}`)}
      style={{ flexDirection: 'column', justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 8, gap: 12 }}
    >
      <InputLabel size="sm">
        {versiculo.livro} {versiculo.capitulo}:{versiculo.id}
      </InputLabel>
      <VerseComponent verse={versiculo} />
      <InputLabel size="sm" style={{ textAlign: 'right' }}>
        {translate('components.verse.attribute', {
          week: ordinal(versiculo.semana),
          theme: versiculo.tema,
          attribute: versiculo.atributo,
        })}
      </InputLabel>
    </TouchableOpacity>
  );
};

export default Verse;
