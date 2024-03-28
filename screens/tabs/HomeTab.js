import { useEffect, useState } from 'react'
import useAppwrite from '../../context/appwriteAuthContext'
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBarWithDialog from '../../components/AppBarWithDialog';
import dbService from '../../appwrite/db';
import AddEventFab from '../../components/AddEventFab';
import EventList from '../../components/EventsList';
import TopTab from './TopTab';
import { Text, View } from 'react-native';

function Event() {
    const { setIsLoading, user: { isOrganizer } } = useAppwrite();

    const [eventsList, setEventsList] = useState([]);

    const fetchEvents = () => {
        console.log('😒😒😒😒😒😒😒😒');
        setIsLoading(true);
        dbService.allEvents().then((res) => {
            const allevnts = res.documents;
            setEventsList(allevnts)
        });
        setIsLoading(false);
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        isOrganizer
            ?
            <EventList data={eventsList} buttonLabel='Read More' />
            :
            <EventList data={eventsList} buttonLabel='Book Now' />
    )
}

function Notice() {
    return (
        <View>
            <Text>Notice</Text>
        </View>
    )
}

function HomeTab() {
    const { user: { isOrganizer } } = useAppwrite();
    return (
        <SafeAreaView className='flex-1 bg-white'>
            <AppBarWithDialog />

            {
                isOrganizer
                    ?
                    <AddEventFab>
                        <TopTab Event={Event} Notice={Notice} />
                    </AddEventFab>
                    :
                    <TopTab Event={Event} Notice={Notice} />
            }
        </SafeAreaView>
    )
}

export default HomeTab