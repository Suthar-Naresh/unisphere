import { useState } from 'react'
import { Pressable, Text, View, Image, Platform } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context';
import useAppwrite from '../context/appwriteContext';
import { KeyboardAvoidingView } from 'react-native';
import InputBox from '../components/InputBox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);

    const { setLoggedIn, auth } = useAppwrite();

    const handleEye = () => {
        setHidePassword((previousHide) => !previousHide);
    }

    const handleLogin = async () => {
        const session = await auth.login({ email, password });
        if (session) {
            setLoggedIn(true);
            console.log('session:', session);
            await AsyncStorage.setItem('appwriteSession', JSON.stringify(session.$id));
        }
    }

    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className='h-screen'>
                <View className='h-screen space-y-4 items-center'>
                    <Image source={require('../assets/login_image.png')} className='w-80 h-80' />
                    <InputBox
                        icon='email-outline'
                        inputMode='email'
                        placeholder='Enter your email'
                        label='Email'
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />

                    <InputBox
                        label='Password'
                        placeholder='Enter your password'
                        icon='lock-outline'
                        secureTextEntry={hidePassword}
                        onChangeText={text => setPassword(text)}
                        right={hidePassword ? <TextInput.Icon icon='eye-outline' onPress={handleEye} /> : <TextInput.Icon icon='eye-off-outline' onPress={handleEye} />}
                    />

                    <Button
                        icon="login"
                        mode="contained"
                        className="w-11/12 rounded-md"
                        onPress={handleLogin}
                    >
                        Login
                    </Button>

                    <View className="">
                        <Text className="">
                            Don't have an account?{'        '}
                            <Pressable onPress={() => navigation.navigate('signup')}>
                                <Text className="text-violet-500 font-extrabold text-sm underline">Sign Up Now</Text>
                            </Pressable>
                        </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen
// ICONS :: https://pictogrammers.com/library/mdi/