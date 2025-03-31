import { SearchableVersiculo } from '@/contexts/DataContext';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { router } from 'expo-router';

const Verse = ({ versiculo }: { versiculo: SearchableVersiculo }) => (
  <TouchableOpacity
    onPress={() => router.push(`/${versiculo.semana}-${versiculo.dia}`)}
    style={{ flexDirection: 'column', justifyContent: 'center', paddingVertical: 12, gap: 12 }}
  >
    <Text>
      {versiculo.livro} {versiculo.capitulo}:{versiculo.id}
    </Text>
    <Text style={{ fontSize: 16 }}>{versiculo.texto}</Text>
    <Text variant="bodySmall" style={{ textAlign: 'right' }}>
      {versiculo.semana}ª Semana - {versiculo.tema} - Deus Pai, {versiculo.atributo}
    </Text>
  </TouchableOpacity>
);

export default Verse;
