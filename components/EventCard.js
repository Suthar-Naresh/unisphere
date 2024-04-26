import React from 'react'
import { Button, Card, TextInput, Title } from 'react-native-paper'
import { Text, View } from 'react-native'


function EventCard({ stats = false, title, organizer, price, description, date, time, imageUrl, onPress, buttonLabel }) {

    return (
        <Card style={{ margin: 16 }} contentStyle={{ margin: 16 }}>
            <View className='flex flex-row justify-between items-center'>
                <Title className='font-bold text-xl'>{title}</Title>
                {(price !== 0) && <Title className=''><TextInput.Icon icon='currency-inr' /></Title>}
            </View>

            <Card.Cover source={{ uri: imageUrl }} className='w-full object-contain' />

            <Card.Content className='space-y-3'>
                <Text variant="titleLarge">{organizer}</Text>
                <Text variant="titleLarge" numberOfLines={3}>{description}</Text>
                <View className='flex flex-row justify-between items-center'>
                    <View className='space-x-8'>
                        <TextInput.Icon icon='calendar' />
                        <Text variant="titleLarge">{date}</Text>
                    </View>
                    <View className='space-x-8'>
                        <TextInput.Icon icon='clock-time-three-outline' />
                        <Text variant="titleLarge">{time}</Text>
                    </View>
                </View>
            </Card.Content>

            <Card.Actions>
                <Button
                    icon={stats && 'chart-timeline-variant-shimmer'}
                    mode='contained'
                    className='rounded-md'
                    onPress={onPress}
                >
                    {buttonLabel}
                </Button>
            </Card.Actions>

        </Card >

    )
}

export default EventCard