import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native'
import { Appbar, Button, Dialog, Divider, HelperText, Portal, RadioButton, Switch, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';

// form imports
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnnouncementSchema } from '../utils/formSchema';
import InputBox from '../components/InputBox';
import { useNavigation } from '@react-navigation/native';
import dbService from '../appwrite/db';
import useAppwrite from '../context/appwriteAuthContext';

function AddAnoucement() {
    const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(AnnouncementSchema) });
    const { user: { docID, university_id } } = useAppwrite();

    const nvigation = useNavigation();

    const handleCreateAnnouncement = async (announcementFormData) => {
        console.log(announcementFormData);
        const res = await dbService.createAnnouncement(announcementFormData.announcement_title, announcementFormData.announcement_description, university_id, docID);

        if (res) {
            console.log('announcement created!');
            reset({
                'announcement_title': '',
                'announcement_description': ''
            });
        }
    }

    return (
        <SafeAreaView className='flex-1 bg-white'>

            <Appbar.Header statusBarHeight={0} className='bg-white'>
                <Appbar.BackAction onPress={() => nvigation.pop()} />
                <Appbar.Content title='Create new annoncement' />
            </Appbar.Header>

            <Divider />

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className='flex-1  '>

                <Divider className='mb-3' />

                <ScrollView keyboardShouldPersistTaps="handled" className='flex-1 '>
                    <View className=' mt-3 space-y-4 items-center'>

                        <InputBox
                            name='announcement_title'
                            label='Announcement title'
                            placeholder='Announcement title'
                            icon='pencil'
                            control={control}
                            formErrors={errors}
                        />

                        <InputBox
                            name='announcement_description'
                            label='Description'
                            placeholder='Description'
                            icon='calendar-text'
                            control={control}
                            formErrors={errors}
                            multiline={true}
                            numberOfLines={10}
                        />


                        <Button
                            icon="plus-box"
                            mode="contained"
                            className="w-11/12 rounded-md mb-5"
                            onPress={handleSubmit(handleCreateAnnouncement)}
                            disabled={isSubmitting}
                        >
                            Create announcement
                        </Button>

                    </View>

                </ScrollView>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default AddAnoucement