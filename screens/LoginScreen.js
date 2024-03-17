import { useState } from 'react'
import { KeyboardAvoidingView, View, Image, Platform, ScrollView } from 'react-native'
import { Button, HelperText, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

// form imports
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../utils/formSchema'

// context imports
import useAppwrite from '../context/appwriteAuthContext';

// component imports
import InputBox from '../components/InputBox';

const LoginScreen = ({ navigation }) => {
    const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(loginSchema) });
    const { auth, setIsLoggedIn, setSessionDetails, setIsLoading } = useAppwrite();

    const [hidePassword, setHidePassword] = useState(true);

    const handleEye = () => {
        setHidePassword((previousHide) => !previousHide);
    }

    const handleLogin = async (loginFormData) => {
        
        try {
            const session = await auth.login({ email: loginFormData.login_email, password: loginFormData.login_password });
            
            if (session) {
                setIsLoading(true);

                reset({
                    'login_email': '',
                    'login_password': ''
                });

                // create user session and set logged-in to true
                console.log('Login screen --> session:', session);
                await AsyncStorage.setItem('appwriteSession', JSON.stringify(session.$id));
                await setSessionDetails();
                setIsLoggedIn(true);
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Invalid credentials.'
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
                        <Image source={require('../assets/login_image.png')} className='w-80 h-80' />

                        <InputBox
                            name='login_email'
                            label='Email'
                            inputMode="email"
                            placeholder='Enter your email'
                            icon='email-outline'
                            control={control}
                            formErrors={errors}
                        />

                        <InputBox
                            name='login_password'
                            label='Password'
                            placeholder='Enter your password'
                            icon='lock-outline'
                            secureTextEntry={hidePassword}
                            right={hidePassword ? <TextInput.Icon icon='eye-outline' onPress={handleEye} /> : <TextInput.Icon icon='eye-off-outline' onPress={handleEye} />}
                            control={control}
                            formErrors={errors}
                        />

                        <Button
                            icon="login"
                            mode="contained"
                            className='w-11/12 rounded-md'
                            onPress={handleSubmit(handleLogin)}
                            disabled={isSubmitting}
                        >
                            Login
                        </Button>

                        <View className="w-11/12 flex flex-row justify-between items-center">
                            <HelperText type='info'>Don't have an account?</HelperText>
                            <HelperText type='info' onPress={() => navigation.navigate('signup_screen')} className='text-violet-500 font-extrabold underline'>Sign Up Now</HelperText>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen