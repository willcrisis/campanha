import PageHeader from '@/components/PageHeader';
import PageView from '@/components/PageView';
import useSearch from '@/hooks/search';
import { Divider, Text, TextInput } from 'react-native-paper';
import { useState } from 'react';
import { FlatList } from 'react-native';
import Verse from '@/components/Verse';

const SearchPage = () => {
  const search = useSearch();
  const [searchText, setSearchText] = useState('');
  const results = search(searchText);

  return (
    <PageView>
      <PageHeader title="Pesquisar" />
      <TextInput label="Texto" value={searchText} onChangeText={setSearchText} />
      <FlatList
        data={results}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <Verse versiculo={item} />}
        ItemSeparatorComponent={() => <Divider />}
        ListEmptyComponent={() => <Text>Nenhum resultado encontrado</Text>}
      />
    </PageView>
  );
};

export default SearchPage;
