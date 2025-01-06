import { ScrollViewProps } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const PageView = (props: ScrollViewProps) => {
  const theme = useTheme();

  return (
    <SafeAreaView
      {...props}
      // @ts-ignore
      style={{ ...(props?.style || {}), backgroundColor: theme.colors.background, flex: 1 }}
    ></SafeAreaView>
  );
};

export default PageView;
