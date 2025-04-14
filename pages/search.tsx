import PageHeader from '@/components/PageHeader';
import PageView from '@/components/PageView';
import useSearch from '@/hooks/search';
import { Divider } from 'react-native-paper';
import { useState } from 'react';
import { FlatList } from 'react-native';
import Verse from '@/components/Verse';
import TextInput from '@/components/inputs/TextInput';
import InputLabel from '@/components/inputs/InputLabel';
import { useI18n } from '@/contexts/I18nContext';

const SearchPage = () => {
  const search = useSearch();
  const [searchText, setSearchText] = useState('');
  const results = search(searchText);
  const { translate } = useI18n();

  return (
    <PageView>
      <PageHeader title={translate('pages.search.title')} />
      <TextInput
        label={translate('inputs.search.label')}
        value={searchText}
        onChangeText={setSearchText}
        style={{ margin: 8 }}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <Verse versiculo={item} />}
        ItemSeparatorComponent={() => <Divider />}
        ListEmptyComponent={() => (
          <InputLabel style={{ textAlign: 'center', padding: 36 }}>{translate('pages.search.noResults')}</InputLabel>
        )}
      />
    </PageView>
  );
};

export default SearchPage;
