import { useState, useEffect } from 'react'
import { View, KeyboardAvoidingView, Image, Platform, ScrollView } from 'react-native'
import { Button, HelperText, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dbService from '../appwrite/db';
import Toast from 'react-native-toast-message';

// form imports
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '../utils/formSchema';

// context imports
import useAppwrite from '../context/appwriteAuthContext';

// component imports~
import Dropdown from '../components/DropDownList';
import InputBox from '../components/InputBox';


// Check function
const checkStudent = async (email, contact, university, url) => {
    try {
        // console.log('🔥🔥🔥🔥🔥',url);
        const postData = {
            "email": email,
            "contact": contact,
            "university": university
        }

        const res = await fetch(url || 'http://192.168.38.51:3000/api/check', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });

        const data = await res.json();

        console.log(data);

        if (data.status === 'ok') {
            return data.data;
        } else {
            Toast.show({
                type: 'error',
                text1: 'Student with provided details does not exist.'
            });
            return null;
        }

    } catch (error) {
        console.log('💣💣', error);
    }
}

function SignUpScreen({ navigation }) {
    const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(signUpSchema) });
    const { auth, setIsLoggedIn, setIsLoading, setSessionDetails } = useAppwrite();

    const [hidePassword, setHidePassword] = useState(true);
    const [universityList, setUniversityList] = useState([]);

    useEffect(() => {
        dbService.getUniversities().then((res) => {
            const x = res.documents.map(({ name, $id, checkURL }) => ({ name, id: $id, checkURL }));
            // console.log(x);

            const filteredUniversities = x.filter(({ checkURL }) => checkURL !== null)
            console.log(filteredUniversities);

            setUniversityList(filteredUniversities);
        });
    }, []);

    const handleEye = () => {
        setHidePassword((previousHide) => !previousHide);
    }

    const handleSignUP = async (signUpFormData) => {

        try {
            const selectedUniversityURL = universityList.find(uni => uni.name === signUpFormData.signup_universityName).checkURL;
            // const selectedUniversityURL = 'https://unisphere-nu.vercel.app/api/check';

            const checkedStudent = await checkStudent(signUpFormData.signup_email, signUpFormData.signup_mobile, signUpFormData.signup_universityName, selectedUniversityURL);

            if (!checkedStudent) return;

            const session = await auth.createAccount({ name: checkedStudent.name, email: signUpFormData.signup_email, password: signUpFormData.signup_password });

            if (session) {
                setIsLoading(true);
                // console.log('account created!');
                try {
                    // creating student record in the database
                    const student = await dbService.createStudent({ name: checkedStudent.name, email: signUpFormData.signup_email, university: signUpFormData.signup_universityName, roll: checkedStudent.enrolment, contact: checkedStudent.contact });
                    if (student) {
                        console.log('Sign-up screen --> session:', session);
                        const creespondingId = universityList.find(uni => uni.name === signUpFormData.signup_universityName).id;
                        await auth.addUserPrefInfo(signUpFormData.signup_universityName, creespondingId, student.$id);

                        reset({
                            'signup_mobile': '',
                            'signup_email': '',
                            'signup_password': '',
                            'signup_retypePassword': '',
                        });

                        await AsyncStorage.setItem('appwriteSession', JSON.stringify(session.$id));
                        await setSessionDetails();
                        setIsLoggedIn(true);
                    }

                } catch (error) {
                    Toast.show({
                        type: 'error',
                        text1: 'Something went wrong.'
                    });
                    console.log(error.message);
                }
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'User with email already exists.'
            });
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className='h-screen'>
                <ScrollView keyboardShouldPersistTaps="handled" className='h-screen'>

                    <View className='h-screen space-y-4 items-center'>
                        <Image source={require('../assets/sign_up_image.png')} className='w-80 h-80' />

                        <Dropdown
                            name='signup_universityName'
                            label='Select University'
                            dropDownList={universityList.map(u => (u.name))}
                            control={control}
                            formErrors={errors}
                        />

                        <InputBox
                            name='signup_mobile'
                            label='Mobile'
                            placeholder='+91 1234567890'
                            icon='cellphone'
                            control={control}
                            formErrors={errors}
                        />

                        <InputBox
                            name='signup_email'
                            label='Email'
                            inputMode='email'
                            placeholder='Enter your email'
                            icon='email-outline'
                            control={control}
                            formErrors={errors}
                        />

                        <InputBox
                            name='signup_password'
                            label='Password'
                            placeholder='Enter your password'
                            icon='lock-outline'
                            secureTextEntry={hidePassword}
                            right={hidePassword ? <TextInput.Icon icon='eye-outline' onPress={handleEye} /> : <TextInput.Icon icon='eye-off-outline' onPress={handleEye} />}
                            control={control}
                            formErrors={errors}
                        />

                        <InputBox
                            name='signup_retypePassword'
                            label="Re-type password"
                            placeholder="Enter your password"
                            icon='lock-outline'
                            secureTextEntry
                            control={control}
                            formErrors={errors}
                        />

                        <Button
                            icon="account-plus"
                            mode="contained"
                            className="w-11/12 rounded-md"
                            onPress={handleSubmit(handleSignUP)}
                            disabled={isSubmitting}
                        >
                            Sign Up
                        </Button>

                        <View className="w-11/12 flex flex-row justify-between items-center">
                            <HelperText type='info'>Already have an account?</HelperText>
                            <HelperText type='info' onPress={() => navigation.navigate('login_screen')} className='text-violet-500 font-extrabold underline'>Login Now</HelperText>
                        </View>

                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SignUpScreen