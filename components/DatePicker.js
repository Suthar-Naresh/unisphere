import { useCallback, useState } from 'react';
import { View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { DatePickerModal } from 'react-native-paper-dates';

function DatePicker({ placeholder, label, icon }) {
    const [date, setDate] = useState(undefined);
    const [open, setOpen] = useState(false);

    const onDismissSingle = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirmSingle = useCallback(
        (params) => {
            setOpen(false);
            console.log(new Date(params.date).getFullYear());
            setDate(params.date);
        },
        [setOpen, setDate]
    );

    console.log(date);

    return (
        <View className='w-11/12'>
            <TextInput
                placeholder={placeholder}
                label={label}
                // disabled={true}
                mode='outlined'
                value={``}
                // onChangeText={onChange}
                // onBlur={onBlur}
                left={<TextInput.Icon icon={icon} onPress={() => setOpen(true)} />}
            // error={formErrors[name] ? true : false}
            // {...props}
            />

            <DatePickerModal            
                locale="en"
                mode="single"
                visible={open}
                onDismiss={onDismissSingle}
                date={date}
                onConfirm={onConfirmSingle}
            />
        </View>
    )
}

export default DatePicker