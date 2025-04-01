import InputView from './InputView';
import { Switch } from 'react-native-paper';
import { SwitchProps } from 'react-native-paper/lib/typescript';
import InputLabel from './InputLabel';

const ConfigSwitch = ({ label, ...props }: SwitchProps & { label: string }) => (
  <InputView>
    <InputLabel>{label}</InputLabel>
    <Switch {...props} />
  </InputView>
);

export default ConfigSwitch;
