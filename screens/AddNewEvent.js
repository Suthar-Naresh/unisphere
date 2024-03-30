import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native'
import { Appbar, Button, Dialog, Divider, HelperText, Portal, RadioButton, Switch, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import { ID } from "appwrite"

// form imports
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EventSchema } from '../utils/formSchema';
import InputBox from '../components/InputBox';
import { useState } from 'react';
import DatePicker from '../components/DatePicker';
import TimePicker from '../components/TimePicker';
import bucketService from '../appwrite/bucket';
import conf from '../conf/conf';

function ImageViewer({ selectedImage }) {
  const imageSource = selectedImage ? { uri: selectedImage } : require('../assets/upload_event_poster.jpg');

  return (
    <Image source={imageSource} className='w-full rounded-md h-full object-cover' />
  )
}


function AddNewEvent() {
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(EventSchema) });

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [value, setValue] = useState('uni_only');
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0]);
      setSelectedImageFile(result.assets[0]);
      setSelectedImage(result.assets[0].uri);
    } else {
      // Alert.alert('','You did not select any image. Therefore default event poster will be shown on this event.');
    }
  }

  const handleCreateEvent = async () => {

    if (selectedImage && selectedImageFile) {
      const posterURL = await bucketService.uploadEventPoster(selectedImage, selectedImageFile.mimeType);
      console.log(posterURL);
    } else {
      Alert.alert('No event poster!', 'You did not select any image. Therefore default event poster will be shown on this event. Do you want to create event?', [
        {
          text: 'Upload',
          onPress: () => pickImageAsync(),
          style: 'cancel',
        },
        {
          text: 'Create',
          onPress: () => console.log('Event created!!')
        },
      ]);
    }

  }

  return (
    <SafeAreaView className='flex-1 bg-white'>

      <Appbar.Header statusBarHeight={0} className='bg-white'>
        <Appbar.Content title='Create new event' />
      </Appbar.Header>

      <Divider />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className='flex-1  '>

        <HelperText className='text-xl w-11/12 mx-auto'>Upload event poster</HelperText>
        <View className='mt-1 w-11/12 h-1/4 rounded-md shadow-md shadow-black mx-auto mb-3'>
          <Pressable onPress={pickImageAsync}>
            <ImageViewer selectedImage={selectedImage} />
          </Pressable>
        </View>

        <Divider className='mb-3' />

        <ScrollView keyboardShouldPersistTaps="handled" className='flex-1 '>
          <View className=' mt-3 space-y-4 items-center'>

            <InputBox
              name='event_name'
              label='Event name'
              placeholder='Event name'
              icon='pencil'
              control={control}
              formErrors={errors}
            />

            <InputBox
              name='event_date'
              label='Event date'
              placeholder='DD/MM/YYYY'
              icon='calendar'
              control={control}
              formErrors={errors}
            />

            <InputBox
              name='event_start'
              label='Event start time'
              placeholder='HH:MM AM/PM'
              icon='clock'
              control={control}
              formErrors={errors}
            />

            <InputBox
              name='event_end'
              label='Event end time'
              placeholder='HH:MM AM/PM'
              icon='clock'
              control={control}
              formErrors={errors}
            />

            <InputBox
              name='event_start_registration'
              label='Event registration start'
              placeholder='DD/MM/YYYY HH:MM'
              icon='calendar-clock'
              control={control}
              formErrors={errors}
            />

            <InputBox
              name='event_end_registration'
              label='Event registration end'
              placeholder='DD/MM/YYYY HH:MM'
              icon='calendar-clock'
              control={control}
              formErrors={errors}
            />

            {/* <DatePicker
              placeholder='Event date'
              label='Event date'
              icon='calendar'
            />

            <TimePicker
              placeholder='Registration start date'
              label='Registration start date'
              icon='clock-outline'
            /> */}

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

            <View className=' flex flex-row items-center w-11/12 justify-between'>
              <Text className='text-base'>Event scope</Text>
              <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                <View className=' w-11/12 flex flex-row items-center'>
                  <Text className='text-slate-700'>University only</Text>
                  <RadioButton value="uni_only" />
                  <Text className='text-slate-700'>For everyone</Text>
                  <RadioButton value="for_all" />
                </View>
              </RadioButton.Group>
            </View>

            <Controller
              control={control}
              name='isPaid'

              render={({ field: { onBlur, value, onChange } }) => (
                <View className='bg-red- flex flex-row w-11/12 items-center justify-between'>
                  <Text>Paid</Text>
                  <Switch value={isSwitchOn} onValueChange={onToggleSwitch} className='' />
                  {errors['isPaid'] && <HelperText type="error" >{errors['isPaid'].message}</HelperText>}
                </View>
              )}
            />


            <InputBox
              name='event_description'
              label='Enter amount'
              placeholder='Enter amount'
              icon='currency-inr'
              keyboardType="numeric"
              className={`${!isSwitchOn && 'hidden'} flex-1`}
              control={control}
              formErrors={errors}
            />

            <Button
              icon="plus-box"
              mode="contained"
              className="w-11/12 rounded-md mb-5"
              onPress={handleSubmit(handleCreateEvent)}
            // disabled={isSubmitting}
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