import { Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import functionService from '../appwrite/functions'
import { useState } from 'react'

function AddNewEvent() {

  const [funkData, setFunkData] = useState('kkkkkkkkkk')

  const handlePay = async () => {
    const res = await functionService.demoFunk(200);
    console.log('res------------',res);
    setFunkData(JSON.parse(JSON.parse(res).amount).amount)
  }

  return (
    <SafeAreaView className='flex-1'>
      <View>
        <Text>Add new event</Text>
      </View>
      <Text>{funkData}</Text>
      <Button onPress={handlePay}>Pay now</Button>
    </SafeAreaView>
  )
}

export default AddNewEvent