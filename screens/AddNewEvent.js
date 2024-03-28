import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native'
import { Appbar, Button, Divider, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';

// form imports
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EventSchema } from '../utils/formSchema';
import InputBox from '../components/InputBox';
import React from 'react';


function AddNewEvent() {
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(EventSchema) });

  const currentDate = new Date();
  const utcDate = currentDate.toISOString(); // Convert to UTC date string

  console.log('current', utcDate);
  const [visible, setVisible] = React.useState(false)
  const onDismiss = React.useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onConfirm = React.useCallback(
    ({ hours, minutes }) => {
      setVisible(false);
      console.log({ hours, minutes });
    },
    [setVisible]
  );

  const [date, setDate] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  console.log(date);


  return (
    <SafeAreaView className='flex-1 bg-white'>
      <Appbar.Header statusBarHeight={0} className='bg-white'>
        <Appbar.Content title='Create new event' />
      </Appbar.Header>

      <Divider />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className='h-screen bg-yellow-300'>

        <ScrollView keyboardShouldPersistTaps="handled" className='flex-1 bg-red-300'>
          <View className='bg-indigo-300 space-y-4 items-center'>

            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
              <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
                Pick single date
              </Button>
              <DatePickerModal
                locale="in"
                mode="single"
                visible={open}
                onDismiss={onDismissSingle}
                date={date}
                onConfirm={onConfirmSingle}
              />
            </View>

            <InputBox
              name='event_name'
              label='Event name'
              placeholder='Event name'
              icon='pencil'
              control={control}
              formErrors={errors}
            />

            <InputBox
              name='event_description'
              label='Event description'
              placeholder='Event description'
              icon='calendar-text'
              control={control}
              formErrors={errors}
              multiline={true}
              numberOfLines={10}
            />

            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
              <Button onPress={() => setVisible(true)} uppercase={false} mode="outlined">
                Pick time
              </Button>
              <TimePickerModal
              locale='in'
                visible={visible}
                onDismiss={onDismiss}
                onConfirm={onConfirm}
                defaultInputType='picker'
              />
            </View>
            {/*
              

event_date
event_start_registration
event_end_registration
event_scope
event_poster
event_organizer
event_price 
*/}
            <Button
              icon="plus-box"
              mode="contained"
              className="w-11/12 rounded-md"
              onPress={handleSubmit(() => { })}
              disabled={isSubmitting}
            >
              Create event
            </Button>
          </View>

        </ScrollView>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default AddNewEvent