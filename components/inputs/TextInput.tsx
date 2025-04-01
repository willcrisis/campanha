import { TextInput as PaperTextInput } from 'react-native-paper';
import { TextInputProps } from 'react-native-paper/lib/typescript';

const TextInput = ({ style, ...props }: TextInputProps) => (
  <PaperTextInput {...props} mode="outlined" style={{ marginBottom: 8, ...(style as object) }} />
);

export default TextInput;
