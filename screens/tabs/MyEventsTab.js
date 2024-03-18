import { Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function MyEventsTab() {

    return (
        <SafeAreaView className='bg-white flex-1'>
            <View className=' flex-1 py-3 px-2 '>
                <Text className='text-3xl font-semibold mb-5'>My Events</Text>
                <View className=' flex-1 my-auto'>
                    <Image source={require('../../assets/no_events.jpg')} className='w-full h-5/6' />
                    <Text className=' text-center text-2xl self-center font-medium my-auto text-slate-800'>Nothing in my events </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default MyEventsTab