import { FlatList, Image, Text, View } from 'react-native'
import useRegisteredEvents from '../context/registeredEventsContext'
import { useEffect, useState } from 'react';
import dbService from '../appwrite/db';
import { Query } from 'appwrite';
import EventCard from './EventCard';
import { UTC2date, UTC2time } from '../utils/dateTimeFormat';
import { useNavigation } from '@react-navigation/native';
import useAppwrite from '../context/appwriteAuthContext';

function OrganizerMyEvents() {
    const { user: { university_id,docID } } = useAppwrite();

    const [myEvents, setMyEvents] = useState([]);
    const { navigate } = useNavigation();

    useEffect(() => {
        dbService.getEventsOfOrganizer(university_id,docID).then(res => {
            console.log('my events:::::::>', res);
            setMyEvents(res);
        });
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
                                        <EventCard
                                            buttonLabel='View'
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