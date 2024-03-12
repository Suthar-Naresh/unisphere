import { Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export default function Loading() {
    return (
        <View className="h-screen items-center justify-center">
            <ActivityIndicator size={75} color='black'/>
            <Text className='text-black text-2xl'>Loading...</Text>
        </View>
    );
}