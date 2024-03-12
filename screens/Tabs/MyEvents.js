import { SafeAreaView } from 'react-native-safe-area-context'
import EventCard from '../../components/EventCard'
import { Text, View } from 'react-native'

const MyEvents = () => {
  return (
    <SafeAreaView>
      <View className='h-screen p-5'>
        <Text className='text-2xl font-semibold mb-5'>My Events</Text>
        <Text className='mt-5'>Here are all your past and future events.</Text>
        <Text className='mt-1'>No events yet? start participating</Text>
      </View>
    </SafeAreaView>
  )
}

export default MyEvents