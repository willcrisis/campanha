import { PropsWithChildren } from 'react';
import { View, ViewStyle } from 'react-native';

const InputView = ({ children, style }: PropsWithChildren<{ style?: ViewStyle }>) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
      padding: 12,
      ...style,
    }}
  >
    {children}
  </View>
);

export default InputView;
