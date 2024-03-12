import { useState } from 'react'
import { Pressable, Text, View, KeyboardAvoidingView, Image, Platform, ScrollView } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context';
import useAppwrite from '../context/appwriteContext';
import InputBox from '../components/InputBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dbService from '../appwrite/db';
import DropDown from 'react-native-paper-dropdown';
import Loading from '../components/Loading'

function SignUpScreen({ navigation }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reTypePassword, setReTypePassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);

    const [showDropDown, setShowDropDown] = useState(false);
    const [university, setUniversity] = useState("");
    const [universityList, setUniversityList] = useState([]);

    const [loading, setLoading] = useState(false);


    const { auth, setLoggedIn } = useAppwrite();

    dbService.getUniversities().then((res) => {
        const x = res.documents.map(({ name }) => ({ label: name, value: name }));
        setUniversityList(x);
    });

    const handleEye = () => {
        setHidePassword((previousHide) => !previousHide);
    }

    const handleSignUP = async () => {
        if (password === reTypePassword) {
            // TODO: make fetch request to python server
            // const res = await fetch(`192.168.10.51:8000/check?name=${name}&university=${university}&email=${email}`);

            const student = await dbService.createStudent({ name, email, university });

            if (student) {
                setLoading(true);
                console.log('account created!');
                const session = await auth.createAccount({ name, email, password });
                if (session) {
                    setLoading(false);
                    setLoggedIn(true);
                    console.log('session:', session);
                    await AsyncStorage.setItem('appwriteSession', JSON.stringify(session.$id));
                }
            }
        } else {
            console.log('password do not match!');
        }
    }

    if(loading){
        return <Loading/>
    }

    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className='h-screen'>
                <ScrollView keyboardShouldPersistTaps="handled" className='h-screen'>

                    <View className='h-screen space-y-4 items-center'>
                        <Image source={require('../assets/sign_up_image.png')} className='w-80 h-80' />

                        <View className='w-11/12' >
                            <DropDown
                                label={"Select University"}
                                mode={"outlined"}
                                visible={showDropDown}
                                showDropDown={() => setShowDropDown(true)}
                                onDismiss={() => setShowDropDown(false)}
                                value={university}
                                setValue={setUniversity}
                                list={universityList}
                                inputProps={{
                                    right: (
                                        <TextInput.Icon icon='menu-down' onPress={() => { }} />
                                    )
                                }}
                            />
                        </View>

                        <InputBox
                            label='Name'
                            placeholder='Enter your name'
                            icon='account-outline'
                            value={name}
                            onChangeText={text => setName(text)}
                        />

                        <InputBox
                            label='Email'
                            placeholder='Enter your email'
                            icon='email-outline'
                            inputMode='email'
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

                        <InputBox
                            label="Re-type password"
                            placeholder="Enter your password"
                            icon='lock-outline'
                            secureTextEntry
                            onChangeText={text => setReTypePassword(text)}
                        />

                        <Button
                            icon="account-plus"
                            mode="contained"
                            onPress={handleSignUP}
                            className="w-11/12 rounded-md"
                        >
                            Sign Up
                        </Button>

                        <View className="flex-col items-center">
                            <Text className="">
                                Already have an account?{'        '}
                                <Pressable onPress={() => navigation.navigate('login')}>
                                    <Text className="text-violet-500 font-extrabold text-sm underline">Login now</Text>
                                </Pressable>
                            </Text>
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SignUpScreen
// ICONS :: https://pictogrammers.com/library/mdi/