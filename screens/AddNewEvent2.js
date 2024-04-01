import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddNewEvent() {

    const [eventStart, setEventStart] = useState(new Date());
    const [eventEnd, setEventEnd] = useState(new Date());
    const [regBegin, setRegBegin] = useState(new Date());
    const [regEnds, setRegEnds] = useState(new Date());

    const [modeEventStart, setModeEventStart] = useState('date');
    const [modeEventEnd, setModeEventEnd] = useState('date');
    const [modRegBegin, setModRegBegin] = useState('date');
    const [modeRegEnds, setModeRegEnds] = useState('date');

    const [showEventStart, setShowEventStart] = useState(false);
    const [showEventEnd, setShowEventEnd] = useState(false);
    const [showRegBegin, setShowRegBegin] = useState(false);
    const [showRegEnds, setShowRegEnds] = useState(false);

    const showMode = (currentMode, setShow, setMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const onChangeEventStart = (selectedDate) => {
        const currentDate = new Date(selectedDate.nativeEvent.timestamp);
        setShowEventStart(false);
        setEventStart(currentDate);
    };

    const onChangeEventEnd = (selectedDate) => {
        const currentDate = new Date(selectedDate.nativeEvent.timestamp);
        setShowEventEnd(false);
        setEventEnd(currentDate);
    };

    const onChangeRegBegin = (selectedDate) => {
        const currentDate = new Date(selectedDate.nativeEvent.timestamp);
        setShowRegBegin(false);
        setRegBegin(currentDate);
    };

    const onChangeRegEnds = (selectedDate) => {
        const currentDate = new Date(selectedDate.nativeEvent.timestamp);
        setShowRegEnds(false);
        setRegEnds(currentDate);
    };

    return (
        <SafeAreaView>

            <TextInput
                className='w-11/12 mx-auto'
                placeholder={'Event start'}
                label={'Event start'}
                editable={false}
                mode='outlined'
                value={`${eventStart}`}
                left={<TextInput.Icon icon='calendar-clock' onPress={() => showMode('date', setShowEventStart, setModeEventStart)} />}
                right={<TextInput.Icon icon='clock-outline' onPress={() => showMode('time', setShowEventStart, setModeEventStart)} />}
            />

            {showEventStart && <DateTimePicker
                value={eventStart}
                mode={modeEventStart}
                onChange={onChangeEventStart}
            />}

            <TextInput
                className='w-11/12 mx-auto'
                placeholder={'Event start'}
                label={'Event ends'}
                editable={false}
                mode='outlined'
                value={`${eventEnd}`}
                left={<TextInput.Icon icon='calendar-clock' onPress={() => showMode('date', setShowEventEnd, setModeEventEnd)} />}
                right={<TextInput.Icon icon='clock-outline' onPress={() => showMode('time', setShowEventEnd, setModeEventEnd)} />}
            />

            {showEventEnd && <DateTimePicker
                value={eventEnd}
                mode={modeEventEnd}
                onChange={onChangeEventEnd}
            />}

            <TextInput
                className='w-11/12 mx-auto'
                placeholder={'Event start'}
                label={'Event start'}
                editable={false}
                mode='outlined'
                value={`${regBegin}`}
                left={<TextInput.Icon icon='calendar-clock' onPress={() => showMode('date', setShowRegBegin, setModRegBegin)} />}
                right={<TextInput.Icon icon='clock-outline' onPress={() => showMode('time', setShowRegBegin, setModRegBegin)} />}
            />

            {showRegBegin && <DateTimePicker
                value={regBegin}
                mode={modRegBegin}
                onChange={onChangeRegBegin}
            />}

            <TextInput
                className='w-11/12 mx-auto'
                placeholder={'Event start'}
                label={'Event ends'}
                editable={false}
                mode='outlined'
                value={`${regEnds}`}
                left={<TextInput.Icon icon='calendar-clock' onPress={() => showMode('date', setShowRegEnds, setModeRegEnds)} />}
                right={<TextInput.Icon icon='clock-outline' onPress={() => showMode('time', setShowRegEnds, setModeRegEnds)} />}
            />

            {showRegEnds && <DateTimePicker
                value={regEnds}
                mode={modeRegEnds}
                onChange={onChangeRegEnds}
            />}

        </SafeAreaView>
    );
};