import PageHeader from '@/components/PageHeader';
import PageView from '@/components/PageView';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { IconButton, Text } from 'react-native-paper';

const SearchPage = () => {
  const navigation = useNavigation();
  return (
    <PageView>
      <PageHeader
        title="Pesquisar"
        leftAction={<IconButton icon="menu" onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />}
      />
      <Text>Pesquisar</Text>
    </PageView>
  );
};

export default SearchPage;
