import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Other = () => {
    return (
        <SafeAreaView>
            <View className='h-screen p-5'>
                <Text className='text-2xl font-semibold mb-5'>External Events</Text>
                <Text>No external events happening now</Text>
            </View>
        </SafeAreaView>
    )
}

export default Other