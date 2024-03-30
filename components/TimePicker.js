import { useCallback, useState } from 'react'
import { Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { TimePickerModal, tr } from 'react-native-paper-dates'

function TimePicker({ placeholder, label, icon }) {
    const current = new Date();
    const [visible, setVisible] = useState(false);
    const [hours, setHours] = useState(current.getHours());
    const [minutes, setMinutes] = useState(current.getMinutes());

    const onDismiss = useCallback(() => {
        setVisible(false)
    }, [setVisible])

    const onConfirm = useCallback(
        ({ hours, minutes }) => {
            setHours(hours);
            setMinutes(minutes);
            setVisible(false);
        },
        [setVisible]
    );

    console.log(typeof hours);

    return (
        <View className='w-11/12'>
            <TextInput
                placeholder={placeholder}
                label={label}
                // disabled={true}
                mode='outlined'
                value={`${hours}:${minutes}`}
                // onChangeText={onChange}
                // onBlur={onBlur}
                left={<TextInput.Icon icon={icon} onPress={() => setVisible(true)} />}
            // error={formErrors[name] ? true : false}
            // {...props}
            />

            <TimePickerModal
                locale='en'
                visible={visible}
                onDismiss={onDismiss}
                onConfirm={onConfirm}
                hours={hours}
                minutes={minutes}
            />
        </View>
    )
}

export default TimePicker