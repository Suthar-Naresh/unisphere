import { useCallback, useState } from 'react';
import { View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { DatePickerModal } from 'react-native-paper-dates';

function DatePicker({ placeholder, label, icon }) {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const showDate = new Date(date).toString().split(' ').splice(0,4);

    const onDismissSingle = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirmSingle = useCallback(
        ({ date }) => {
            setOpen(false);
            // console.log(new Date(date).getFullYear());

            const selectedDate = new Date(date);
            const year = selectedDate.getFullYear();
            const month = selectedDate.getMonth();
            const day = selectedDate.getDate();

            // console.log(year, month, day);
            setDate(new Date(year, month, day));
        },
        [setOpen, setDate]
    );

    console.log(new Date(date).toString().split(' ').splice(0,4));

    return (
        <View className='w-11/12'>
            <TextInput
                placeholder={placeholder}
                label={label}
                editable={false}
                mode='outlined'
                value={`${showDate[0]} ${showDate[1]} ${showDate[2]} ${showDate[3]}`}
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
                onConfirm={onConfirmSingle}
                date={date}
                validRange={{startDate:new Date(),endDate:new Date(2024,11,31)}}
            />
        </View>
    )
}

export default DatePicker