import InputView from './InputView';
import { Switch, useTheme } from 'react-native-paper';
import { SwitchProps } from 'react-native-paper/lib/typescript';
import InputLabel from './InputLabel';

const ConfigSwitch = ({ label, ...props }: SwitchProps & { label: string }) => {
  const theme = useTheme();
  return (
    <InputView>
      <InputLabel>{label}</InputLabel>
      <Switch {...props} trackColor={{ true: theme.colors.outline }} />
    </InputView>
  );
};

export default ConfigSwitch;
