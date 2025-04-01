import { TouchableOpacity } from 'react-native';
import InputView from './InputView';
import { useState } from 'react';
import { TimePickerModal } from 'react-native-paper-dates';
import InputLabel from './InputLabel';

type TimePickerProps = {
  label: string;
  hours: number;
  minutes: number;
  onChange: (hours: number, minutes: number) => void;
};

const TimePicker = ({ label, hours, minutes, onChange }: TimePickerProps) => {
  const [show, setShow] = useState(false);

  return (
    <InputView>
      <InputLabel>{label}</InputLabel>
      <TouchableOpacity onPress={() => setShow(true)}>
        <InputLabel>{`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`}</InputLabel>
      </TouchableOpacity>
      <TimePickerModal
        visible={show}
        onDismiss={() => setShow(false)}
        hours={hours || 7}
        minutes={minutes || 0}
        onConfirm={({ hours, minutes }) => {
          onChange(hours, minutes);
          setShow(false);
        }}
      />
    </InputView>
  );
};

export default TimePicker;
