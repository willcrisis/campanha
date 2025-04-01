import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Text } from 'react-native-paper';
import { TextProps } from 'react-native-paper/lib/typescript';

type InputLabelProps = Omit<TextProps<never>, 'variant'> & {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  bold?: boolean;
};

const InputLabel = ({ size = 'md', bold = false, ...props }: InputLabelProps) => {
  const { fontSize } = useAccessibility();
  const fontSizeMap = {
    sm: fontSize * 0.9,
    md: fontSize,
    lg: fontSize * 1.2,
    xl: fontSize * 1.4,
  };

  return (
    <Text
      {...props}
      style={{ fontSize: fontSizeMap[size], fontWeight: bold ? 'bold' : 'normal', ...(props.style as object) }}
    />
  );
};

export default InputLabel;
