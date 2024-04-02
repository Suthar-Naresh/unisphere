import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native'
import { Appbar, Button, Divider, HelperText, RadioButton, Switch, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

// form imports
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import InputBox from '../components/InputBox';
import { EventSchema } from '../utils/formSchema';
import useAppwrite from '../context/appwriteAuthContext';
import dbService from "../appwrite/db"
import bucketService from "../appwrite/bucket"
import Toast from 'react-native-toast-message';

function ImageViewer({ selectedImage }) {
  const imageSource = selectedImage ? { uri: selectedImage } : require('../assets/upload_event_poster.jpg');

  return (
    <Image source={imageSource} className='w-full rounded-md h-full object-cover' />
  )
}

function AddNewEventScreen() {
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(EventSchema) });
  const { user: { docID, university_id } } = useAppwrite();
  const nvigation = useNavigation();

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [value, setValue] = useState('uni_only');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [eventPrice, setEventPrice] = useState(null);
  const [eventPriceError, setEventPriceError] = useState(''); // please fix me, when sitch is on and user doesn't provide the amount

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  /* ---------------------- START OF DATE TIME PICKERS ----------------------------------- */
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
  /* ---------------------- END OF DATE TIME PICKERS ----------------------------------- */

  function dateTimeBeautify(dateTimeString) {
    return `${dateTimeString.toDateString()}, ${dateTimeString.toLocaleTimeString()}`
  }

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

  function formCleanUp() {
    reset({
      'event_name': '',
      'event_description': '',
      'event_venue': '',
    });

    setSelectedImage(null);
    setSelectedImageFile(null);
    setValue('uni_only');
    setIsSwitchOn(false);
    setEventPrice(null);
  }

  const handleCreateEvent = async (eventFormData) => {

    let posterURL = null;

    const formData = {
      price: isSwitchOn ? parseInt(eventPrice) : 0,
      event_name: eventFormData.event_name,
      event_description: eventFormData.event_description,
      scope: value,
      event_starts: eventStart.toISOString(),
      event_ends: eventEnd.toISOString(),
      registration_start: regBegin.toISOString(),
      registration_end: regEnds.toISOString(),
      organizer_name: docID,
      venue: eventFormData.event_venue,
      university_id
    }

    if (selectedImage && selectedImageFile) {
      posterURL = await bucketService.uploadEventPoster(selectedImage, selectedImageFile.mimeType);
      console.log(posterURL);
      const res = await dbService.createNewEvent(posterURL, formData);

      if (res) {
        Toast.show({
          type: 'success',
          text1: 'Event Created!'
        });
        formCleanUp();
      }

    } else {
      Alert.alert('No event poster!', 'You did not select any image. Therefore default event poster will be shown on this event. Do you want to create event?', [
        {
          text: 'Upload',
          onPress: () => pickImageAsync(),
          style: 'cancel',
        },
        {
          text: 'Create',
          onPress: async () => {
            const res = await dbService.createNewEvent(posterURL, formData);
            if (res) {
              Toast.show({
                type: 'success',
                text1: 'Event Created!'
              });
              formCleanUp();
            }
          },
        }
      ]);
    }

  }

return (
  <SafeAreaView className='flex-1 bg-white'>

    <Appbar.Header statusBarHeight={0} className='bg-white'>
      <Appbar.BackAction onPress={() => nvigation.pop()} />
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
            name='event_venue'
            label='Event venue'
            placeholder='Event venue'
            icon='map-marker'
            control={control}
            formErrors={errors}
          />

          <TextInput
            className='w-11/12 mx-auto'
            placeholder={'Event starts'}
            label={'Event starts'}
            editable={false}
            mode='outlined'
            value={dateTimeBeautify(eventStart)}
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
            placeholder={'Event ends'}
            label={'Event ends'}
            editable={false}
            mode='outlined'
            value={dateTimeBeautify(eventEnd)}
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
            placeholder={'Registration starts'}
            label={'Registration starts'}
            editable={false}
            mode='outlined'
            value={dateTimeBeautify(regBegin)}
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
            placeholder={'Registration ends'}
            label={'Registration ends'}
            editable={false}
            mode='outlined'
            value={dateTimeBeautify(regEnds)}
            left={<TextInput.Icon icon='calendar-clock' onPress={() => showMode('date', setShowRegEnds, setModeRegEnds)} />}
            right={<TextInput.Icon icon='clock-outline' onPress={() => showMode('time', setShowRegEnds, setModeRegEnds)} />}
          />

          {showRegEnds && <DateTimePicker
            value={regEnds}
            mode={modeRegEnds}
            onChange={onChangeRegEnds}
          />}

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

          <View className='bg-red- flex flex-row w-11/12 items-center justify-between'>
            <Text>Paid</Text>
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} className='' />
          </View>

          <View className='w-11/12'>
            <TextInput
              name='event_description'
              label='Enter amount'
              placeholder='Enter amount'
              mode='outlined'
              value={eventPrice}
              keyboardType="numeric"
              className={`${!isSwitchOn && 'hidden'} flex-1`}
              onChangeText={(txt) => { setEventPrice(txt) }}
              left={<TextInput.Icon icon='currency-inr' />}
            />
          </View>

          <Button
            icon="plus-box"
            mode="contained"
            className="w-11/12 rounded-md mb-5"
            onPress={handleSubmit(handleCreateEvent)}
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

export default AddNewEventScreen