import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import EventCard from '../../components/EventCard'
import { useEffect } from 'react'

async function fetcher() {
    try {
        const response = await fetch('192.168.20.51:8000/check?name=demo&university=ss&email=koko'); // Replace with your server URL
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

function OthersTab({ navigation }) {

// teamService.getTeamMembers(teamId).then(res=>console.log('😎😎😎',res)).catch(err=>console.log('something bad happened o_O'));

return (
    <SafeAreaView>
        <View className=''>
            <Text>External events</Text>
        </View>
        <EventCard />
        
    </SafeAreaView>
)
}

export default OthersTab