import { useEffect, useState } from 'react'
import useAppwrite from '../../context/appwriteAuthContext'
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBarWithDialog from '../../components/AppBarWithDialog';
import dbService from '../../appwrite/db';
import AddEventFab from '../../components/AddEventFab';
import EventList from '../../components/EventsList';
import TopTab from './TopTab';
import { Text, View } from 'react-native';
import { Client } from 'appwrite';
import conf from '../../conf/conf';

function Event() {
    const { auth, setIsLoading, user: { isOrganizer, university } } = useAppwrite();

    const [eventsList, setEventsList] = useState([]);

    const fetchEvents = () => {
        console.log('😒😒😒😒😒😒😒😒');
        setIsLoading(true);
        dbService.allEvents().then((res) => {
            const allevnts = res.documents;
            const filteredList = allevnts.filter(evnt => evnt.university_name.name === university);
            console.log(res);
            setEventsList(filteredList)
            // console.log(allevnts);
        });
        setIsLoading(false);
    }

    useEffect(() => {
        fetchEvents();

        const unsubscribe = auth.client.subscribe(`databases.${conf.db_id}.collections.${conf.event_collection_id}.documents`, response => {
            // If new event created
            if (response.events.includes("databases.*.collections.*.documents.*.create")) {
                if (response.payload.university_name.name === university) {
                    setEventsList(prev => [response.payload, ...prev]);
                }
            }

            // If event is deleted
            if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
                if (response.payload.university_name.name === university) {
                    setEventsList(prev => prev.filter(evnt => evnt.$id !== response.payload.$id));
                }
            }

            // If event is updated
            if (response.events.includes("databases.*.collections.*.documents.*.update")) {
                if (response.payload.university_name.name === university) {
                    setEventsList(prev => prev.filter(evnt => evnt.$id !== response.payload.$id));
                    setEventsList(prev => [response.payload, ...prev]);
                }
            }
            console.log(response);
        });

        // Closes the subscription.

        return () => {
            unsubscribe();
        }
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
    useEffect(() => {
        console.log('notice....');
    }, [])
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