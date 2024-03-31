import { Text, View } from 'react-native'
import { Button, Divider, Appbar, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import { UTC2date } from '../utils/dateTimeFormat'

function NoticeScreen({ navigation, route }) {

    const { cardDetails: { description, title, date, organizer: { name } } } = route.params;

    return (
        <SafeAreaView className='bg-white flex-1'>

            <Appbar.Header statusBarHeight={0} className='bg-white'>
                <Appbar.BackAction onPress={() => navigation.pop()} />
                <Appbar.Content title='Announcement' />
            </Appbar.Header>

            <Divider />

            <View className='flex-1  p-3'>
                <Text className='my-3 text-2xl font-semibold text-center underline'>{title}</Text>
                <View className=' flex flex-row items-center justify-between'>
                    <Text className='font-semibold text-lg'>{name}</Text>
                    <View className='space-x-8'>
                        <TextInput.Icon icon='calendar' />
                        <Text variant="titleLarge">{UTC2date(date)}</Text>
                    </View>
                </View>

                <ScrollView className=' mt-3 flex-1'>
                    <Text className='text-justify'>
                        {description}
                    </Text>
                </ScrollView>
            </View>


        </SafeAreaView>

    )
}

export default NoticeScreen