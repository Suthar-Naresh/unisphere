import { useCallback, useState } from 'react';
import { View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';

function DateTimePicker({ placeholder }) {
    const current = new Date();

    // calendar
    const [date, setDate] = useState(current);
    const [open, setOpen] = useState(false);

    // clock
    const [visible, setVisible] = useState(false);
    const [hours, setHours] = useState(current.getHours());
    const [minutes, setMinutes] = useState(current.getMinutes());

    const clockDismiss = useCallback(() => {
        setVisible(false)
    }, [setVisible])

    const clockConfirm = useCallback(
        ({ hours, minutes }) => {
            setHours(hours);
            setMinutes(minutes);
            setVisible(false);
        },
        [setVisible]
    );

    const calendarDismiss = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const calendarConfirm = useCallback(
        ({ date }) => {
            setOpen(false);
            // console.log(new Date(date).getFullYear());

            const selectedDate = new Date(date);
            const year = selectedDate.getFullYear();
            const month = selectedDate.getMonth();
            const day = selectedDate.getDate();

            // console.log(year, month, day);
            setDate(new Date(year, month, day));
            setVisible(true)
        },
        [setOpen, setDate]
    );

    console.log(new Date(date).toString().split(' ').splice(0, 4));
    
    const selDate = new Date(date).toString().split(' ').splice(0, 4);
    const showDate = `${selDate[0]} ${selDate[1]} ${selDate[2]} ${selDate[3]}`;
    const showTime = `${hours % 12 || 12}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;

    return (
        <View className='w-11/12 mt-4'>
            <TextInput
                placeholder={placeholder}
                label={placeholder}
                editable={false}
                mode='outlined'
                value={`${showDate} at ${showTime}`}
                left={<TextInput.Icon icon='calendar-clock' onPress={() => setOpen(true)} />}
                right={<TextInput.Icon icon='clock-outline' onPress={() => setVisible(true)} />}
            />

            <DatePickerModal
                locale="en"
                mode="single"
                visible={open}
                onDismiss={calendarDismiss}
                onConfirm={calendarConfirm}
                validRange={{ startDate: new Date(), endDate: new Date(current.getFullYear(), 11, 31) }}
            />

            <TimePickerModal
                locale='en'
                visible={visible}
                onDismiss={clockDismiss}
                onConfirm={clockConfirm}
            />

        </View>
    )
}

export default DateTimePicker