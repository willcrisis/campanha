import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { ReactElement } from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

type Props = {
  title?: string;
  leftAction?: ReactElement;
  rightAction?: ReactElement;
};

const PageHeader = ({ title, leftAction, rightAction }: Props) => {
  const navigation = useNavigation();
  return (
    <View
      style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, marginBottom: 8 }}
    >
      <View style={{ position: 'absolute', left: 8 }}>
        <IconButton icon="menu" onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
      </View>
      {title && <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>}
      {rightAction && <View style={{ position: 'absolute', right: 8 }}>{rightAction}</View>}
    </View>
  );
};

export default PageHeader;
