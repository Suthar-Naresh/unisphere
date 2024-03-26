import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'

function PaymentButton({ onPress, free = false }) {
    return (
        <View className=' flex-1'>
            <View className=' flex-1'>
                <Button
                    mode='contained'
                    className='absolute bottom-0 w-full rounded-md'
                    onPress={onPress}
                >
                    {free ? 'Register For Free' : 'Book Tickets Now'}
                </Button>
            </View>
        </View>
    )
}

export default PaymentButton