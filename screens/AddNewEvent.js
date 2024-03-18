import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function AddNewEvent() {
  return (
    <SafeAreaView className='flex-1'>
    <View>
        <Text>Add new event</Text>
    </View>
</SafeAreaView>
  )
}

export default AddNewEvent