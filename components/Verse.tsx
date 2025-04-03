import { SearchableVersiculo } from '@/contexts/DataContext';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import InputLabel from './inputs/InputLabel';
import { Verse as VerseComponent } from './Scriptures';

const Verse = ({ versiculo }: { versiculo: SearchableVersiculo }) => (
  <TouchableOpacity
    onPress={() => router.push(`/${versiculo.semana}-${versiculo.dia}`)}
    style={{ flexDirection: 'column', justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 8, gap: 12 }}
  >
    <InputLabel size="sm">
      {versiculo.livro} {versiculo.capitulo}:{versiculo.id}
    </InputLabel>
    <VerseComponent verse={versiculo} />
    <InputLabel size="sm" style={{ textAlign: 'right' }}>
      {versiculo.semana}ª Semana - {versiculo.tema} - Deus Pai, {versiculo.atributo}
    </InputLabel>
  </TouchableOpacity>
);

export default Verse;
