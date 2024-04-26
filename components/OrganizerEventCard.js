import React from 'react'
import { Button, Card, TextInput, Title } from 'react-native-paper'
import { Image, Text, View } from 'react-native'


function OrganizerEventCard({ stats = false, title, organizer, price, description, date, time, imageUrl, onPress, buttonLabel }) {

    return (
        <View className='bg-purple-50 shadow-md shadow-black p-2 rounded-md flex flex-row space-x-2 h-56 w-11/12 mx-auto my-4'>
            <View className="w-36">
                <Image source={{ uri: imageUrl }} className='w-full h-full rounded-md object-contain' />
            </View>

            <View className="flex justify-between flex-1">
                <View>
                    <Text className="font-semibold text-2xl" numberOfLines={1}>{title}</Text>
                    <View className="flex flex-row items-center justify-between">
                        <Text className="font-medium">{organizer}</Text>
                        {(price !== 0) && <Title className=''><TextInput.Icon icon='currency-inr' /></Title>}
                    </View>
                    <Text className="text-sm my-2 text-stone-500" numberOfLines={2}>{description}</Text>
                </View>

                <View className='mt-2'>
                    <View className='flex gap-1'>
                        <View className='space-x-8'>
                            <TextInput.Icon icon='calendar' />
                            <Text variant="titleLarge">{date}</Text>
                        </View>
                        <View className='space-x-8'>
                            <TextInput.Icon icon='clock-time-three-outline' />
                            <Text variant="titleLarge">{time}</Text>
                        </View>
                    </View>
                    <Button
                        icon={stats && 'chart-timeline-variant-shimmer'}
                        mode='contained'
                        className='rounded-md mt-2'
                        onPress={onPress}
                    >
                        {buttonLabel}
                    </Button>
                </View>

            </View>
        </View>

    )
}

export default OrganizerEventCard