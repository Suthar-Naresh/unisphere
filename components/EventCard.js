import React from 'react'
import { Button, Card, TextInput, Title } from 'react-native-paper'
import { Text, View } from 'react-native'


function EventCard({ title, organizer, price, description, date, time, imageUrl, onPress, buttonLabel }) {
    // bucketService.getFilePreview('65f4770561d385014143').then(res => console.log(res)).catch(err => console.log(err.message))

    // bucketService.getAllPosters().then(res=>{
    //     res.files.forEach((file) => {
    //         // Log file details
    //         console.log('File ID:', file.$id);
    //         console.log('File Name:', file.name);
    //         console.log('File Size:', file.size);
    //         console.log('File MIME Type:', file.mimeType);
    //         console.log('---');
    //       });
    // }).catch(err=>console.log(err))

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
                <Button mode='contained' className='rounded-md' onPress={onPress} >{buttonLabel}</Button>
            </Card.Actions>

        </Card>

    )
}

export default EventCard