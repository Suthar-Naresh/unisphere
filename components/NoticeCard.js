import { View } from 'react-native'
import { Button, Card, Text, TextInput, Title } from 'react-native-paper'

function NoticeCard() {
    const desc = 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.    '
    return (
        <Card style={{ margin: 16 }} contentStyle={{ margin: 16 }}>
            <View className='flex flex-row justify-between items-center'>
                <Title className='font-bold text-xl'>{'Cancellation of MSE '}</Title>
            </View>

            <Card.Content className='space-y-3'>
                <View className=' flex flex-row items-center justify-between'>
                    <Text variant="titleLarge">{'Student Corner'}</Text>
                    <View className='space-x-8'>
                        <TextInput.Icon icon='calendar' />
                        <Text variant="titleLarge">{'22 Feb, 2024'}</Text>
                    </View>
                </View>
                <Text variant="titleLarge" numberOfLines={3}>{desc}</Text>
            </Card.Content>

            <Card.Actions>
                <Button mode='contained' className='rounded-md' onPress={() => { }} >{'Read'}</Button>
            </Card.Actions>

        </Card>
    )
}

export default NoticeCard