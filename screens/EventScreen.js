import React from 'react'
import { Text, View, Image } from 'react-native'
import { Button, Card, Divider, Snackbar, Appbar, TextInput, Icon } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

function EventScreen({ navigation, route }) {
    // console.log(route.params);
    const { cardDetails: { name, poster, price, organizer, description } } = route.params;

    return (
        <SafeAreaView className='bg-white'>

            <Appbar.Header className='bg-white'>
                <Appbar.BackAction onPress={() => navigation.pop()} />
                <Appbar.Content title={name} />
            </Appbar.Header>

            <View className='h-full p-3 bg-yellow-300'>
                <View className='h-1/4 rounded-md shadow-md shadow-black ' >
                    <Image source={{ uri: poster.toString() }} className='w-full rounded-md h-full object-cover' />

                    <View className=' flex flex-row items-baseline justify-between mt-6 mb-2'>
                        <Text className='font-bold text-xl text-gray-800'>
                            {price === 0 ? 'Free' : <><Icon source="currency-inr" size={22} />{price}</>}
                        </Text>
                        <Text className='font-medium text-sm text-gray-600'>{organizer}</Text>
                    </View>

                    <Divider />

                    <Text className='my-2 font-semibold text-xl text-gray-800'>Description</Text>
                    <Text className='bg-red-300 text-justify'>{description}</Text>

                    <View className='flex flex-row justify-between items-center'>
                        <View className='space-x-8'>
                            <TextInput.Icon icon='calendar' />
                            <Text variant="titleLarge">{'24 Feb, 2024'}</Text>
                        </View>
                        <View className='space-x-8'>
                            <TextInput.Icon icon='clock-time-three-outline' />
                            <Text variant="titleLarge">{'03:01 PM - 01:30 AM'}</Text>
                        </View>
                    </View>

                    <View className='flex items-stretch'>
                        <View className='bg-indigo-300 flex-1'>
                            <Button mode='contained' className='absolute w-full rounded-md' onPress={() => console.log('PAYMENT LOGIC HERE...')} >Book Now</Button>
                        </View>
                    </View>

                </View>
            </View>
        </SafeAreaView>

    )
}

export default EventScreen