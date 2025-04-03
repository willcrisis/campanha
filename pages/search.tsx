import PageHeader from '@/components/PageHeader';
import PageView from '@/components/PageView';
import useSearch from '@/hooks/search';
import { Divider } from 'react-native-paper';
import { useState } from 'react';
import { FlatList } from 'react-native';
import Verse from '@/components/Verse';
import TextInput from '@/components/inputs/TextInput';
import InputLabel from '@/components/inputs/InputLabel';
const SearchPage = () => {
  const search = useSearch();
  const [searchText, setSearchText] = useState('');
  const results = search(searchText);

  return (
    <PageView>
      <PageHeader title="Pesquisar" />
      <TextInput label="Buscar..." value={searchText} onChangeText={setSearchText} style={{ margin: 8 }} />
      <FlatList
        data={results}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <Verse versiculo={item} />}
        ItemSeparatorComponent={() => <Divider />}
        ListEmptyComponent={() => (
          <InputLabel style={{ textAlign: 'center', padding: 36 }}>Nenhum resultado encontrado</InputLabel>
        )}
      />
    </PageView>
  );
};

export default SearchPage;
