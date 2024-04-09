import { View, Text } from 'react-native'
import AppBarWithDialog from '../components/AppBarWithDialog'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Divider } from "react-native-paper"
import { ScrollView } from 'react-native'

export default function BuySubscription({ university }) {
    return (
        <SafeAreaView className='flex-1 bg-white'>
            <AppBarWithDialog />

            <Divider />

            <ScrollView className='mt-5 flex-1 p-4'>

                <Text className='text-2xl font-medium text-gray-700'>
                    Dear {university} Student,
                </Text>

                <Text className='mt-3 text-lg tracking-wider text-justify text-zinc-700'>
                    We regret to inform you that access to our app is currently unavailable as your university has not subscribed to our services. We apologize for any inconvenience this may cause.
                </Text>

                <View className='mt-7 space-y-3'>
                    <Text className='text-xl font-semibold text-slate-700'>What You Can Do:</Text>
                    <View className=' space-y-5 p-1'>
                        <Text className='text-justify text-base text-zinc-700'>{'\u2B24'} Explore alternative resources provided by your university for academic support and community engagement.</Text>
                        <Text className='text-justify text-base text-zinc-700'>{'\u2B24'} Stay informed about any updates regarding app access from your university administration.</Text>
                        <Text className='text-justify text-base text-zinc-700'>{'\u2B24'} Share your interest in our app with university administrators to potentially advocate for future access.</Text>
                    </View>
                </View>

                <View className='mt-7'>
                    <Text className='text-lg text-zinc-700'>Sincerely,</Text>
                    <Text className='text-lg text-zinc-700 font-semibold'>Team UniSphere</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}