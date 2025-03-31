import PageHeader from '@/components/PageHeader';
import PageView from '@/components/PageView';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { IconButton, Text } from 'react-native-paper';

const ConfigPage = () => {
  const navigation = useNavigation();
  return (
    <PageView>
      <PageHeader
        title="Configurações"
        leftAction={<IconButton icon="menu" onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />}
      />
      <Text>Configurações</Text>
    </PageView>
  );
};

export default ConfigPage;
