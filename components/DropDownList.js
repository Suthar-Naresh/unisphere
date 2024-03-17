import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { Controller } from 'react-hook-form';
import { HelperText } from 'react-native-paper';

const DropdownList = ({ name, control, dropDownList, label, formErrors }) => {
  const err = formErrors[name];
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field: { onChange, value } }) => (
        <View className={`w-11/12 px-1 border ${err && 'border-2'} ${err ? 'bg-red-100' : 'bg-violet-100'} ${err ? 'border-red-700' : 'border-[#757575]'}  ${err ? 'focus:border-red-700' : 'focus:border-[#4527a0]'} focus:border-2 rounded-md`}>
          <Picker
            selectedValue={value}
            onValueChange={onChange}
          >
            <Picker.Item label={label} value="" enabled={false} style={err ? { backgroundColor: '#fee2e2' } : { backgroundColor: '#ede9fe' }} />
            {dropDownList.map((listItem, index) => (
              <Picker.Item key={index} label={listItem} value={listItem} />
            ))}
          </Picker>
          {err &&
            <HelperText type='error'>{err.message}</HelperText>
          }
        </View>
      )}
    />
  );
};

export default DropdownList;
