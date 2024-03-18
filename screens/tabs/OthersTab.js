import { Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

async function fetcher() {
    try {
        const response = await fetch('192.168.20.51:8000/check?name=demo&university=ss&email=koko'); // Replace with your server URL
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

function OthersTab({ navigation }) {

    // teamService.getTeamMembers(teamId).then(res=>console.log('😎😎😎',res)).catch(err=>console.log('something bad happened o_O'));

    return (
        <SafeAreaView className='bg-white flex-1'>
            <View className=' flex-1 py-3 px-2 '>
                <Text className='text-3xl font-semibold mb-5'>Others</Text>
                <View className=' flex-1 my-auto'>
                    <Image source={require('../../assets/no_external_events_yet.jpg')} className='w-full h-5/6' />
                    <Text className=' text-center text-2xl self-center font-medium my-auto text-slate-800'>No external events yet</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default OthersTab