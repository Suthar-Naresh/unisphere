import { Image, Text, View } from 'react-native'
import { Appbar, Divider } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import useRegisteredEvents from '../../context/registeredEventsContext'

function MyEventsTab() {
    const { events } = useRegisteredEvents();

    return ( 
        <SafeAreaView className='bg-white flex-1'>
            <Appbar.Header statusBarHeight={0} className='bg-white'>
                <Appbar.Content title="My Events" titleStyle={{ fontWeight: '600' }} />
            </Appbar.Header>
            <Divider />

            {
                events.length === 0 
                ?
                <View className=' flex-1 py-3 px-2 '>
                    <View className=' flex-1 my-auto'>
                        <Image source={require('../../assets/no_events.jpg')} className='w-full h-5/6' />
                        <Text className=' text-center text-2xl self-center font-medium my-auto text-slate-800'>Nothing in my events </Text>
                    </View>
                </View>
                :
<></>
            }
        </SafeAreaView>
    )
}

export default MyEventsTab