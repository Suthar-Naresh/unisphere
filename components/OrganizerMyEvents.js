import { FlatList, Image, Text, View } from 'react-native'
import useRegisteredEvents from '../context/registeredEventsContext'
import { useEffect, useState } from 'react';
import dbService from '../appwrite/db';
import { Query } from 'appwrite';
import EventCard from './EventCard';
import { UTC2date, UTC2time } from '../utils/dateTimeFormat';
import { useNavigation } from '@react-navigation/native';
import useAppwrite from '../context/appwriteAuthContext';
import conf from '../conf/conf'
import OrganizerEventCard from './OrganizerEventCard';

function OrganizerMyEvents() {
    const { auth, user: { university_id, docID } } = useAppwrite();

    const [myEvents, setMyEvents] = useState([]);
    const { navigate } = useNavigation();


    const fetchEvents = () => {
        dbService.getEventsOfOrganizer(university_id, docID).then(res => {
            console.log('my events:::::::>', res);
            setMyEvents(res);
        }).catch(e => console.log(e));
    }

    useEffect(() => {
        fetchEvents();
        
        const unsubscribe = auth.client.subscribe(`databases.${conf.db_id}.collections.${conf.event_collection_id}.documents`, response => {
            // If new event created
            if (response.events.includes("databases.*.collections.*.documents.*.create")) {
                if (response.payload.organizer_name.$id === docID) {
                    setMyEvents(prev => [response.payload, ...prev]);
                }
            }
        });

        // Closes the subscription.
        return () => {
            unsubscribe();
        }
    }, []);



    return (
        <>
            {
                myEvents.length === 0
                    ?
                    <View className=' flex-1 py-3 px-2 '>
                        <View className=' flex-1 my-auto'>
                            <Image source={require('../assets/no_events.jpg')} className='w-full h-5/6' />
                            <Text className=' text-center text-2xl self-center font-medium my-auto text-slate-800'>Nothing in your events</Text>
                        </View>
                    </View>
                    :
                    <View className='flex-1 bg-zinc-100'>
                        <View className=' py-2 flex-1'>
                            <View className=''>
                                <FlatList
                                    className=''
                                    keyExtractor={(item, index) => item.$id}
                                    data={myEvents}
                                    renderItem={({ item }) => (
                                        <OrganizerEventCard
                                            stats={true}
                                            buttonLabel='Reach'
                                            imageUrl={item.poster.toString()}
                                            title={item.event_name}
                                            date={UTC2date(item.event_starts)}
                                            organizer={item.organizer_name.name}
                                            time={UTC2time(item.event_starts)}
                                            price={item.price}
                                            description={item.event_description}
                                            onPress={() => navigate('my_event_screen', { cardDetails: item })} />
                                    )}
                                />
                            </View>
                        </View>
                    </View>
            }
        </>
    )
}

export default OrganizerMyEvents