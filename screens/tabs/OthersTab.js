import { FlatList, Image, Text, View } from 'react-native'
import { Appbar, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context'
import useAppwrite from '../../context/appwriteAuthContext'
import useRegisteredEvents from '../../context/registeredEventsContext';
import { useEffect, useState } from 'react';
import dbService from '../../appwrite/db';
import conf from '../../conf/conf';
import EventCard from '../../components/EventCard';
import { UTC2date, UTC2time } from '../../utils/dateTimeFormat';

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

    const { auth, setIsLoading, user: { isOrganizer } } = useAppwrite();
    const { events } = useRegisteredEvents();

    const [externalEvente, setExternalEvente] = useState([]);

    const fetchEvents = () => {
        console.log('😒😒😒😒😒😒😒😒');
        setIsLoading(true);

        dbService.fetchExternalEvents().then((res) => {

            const allevnts = res.documents;
            const filteredList = allevnts.filter(evt => !events.includes(evt.$id));

            // console.log(res);
            setExternalEvente(filteredList)
            // console.log(allevnts);
        });

        setIsLoading(false);
    }

    useEffect(() => {
        fetchEvents();

        const unsubscribe = auth.client.subscribe(`databases.${conf.db_id}.collections.${conf.event_collection_id}.documents`, response => {
            // If new event created
            if (response.events.includes("databases.*.collections.*.documents.*.create")) {
                if (response.payload.scope === "for_all") {
                    setExternalEvente(prev => [response.payload, ...prev]);
                }
            }

            // If event is deleted
            if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
                if (response.payload.scope === "for_all") {
                    setExternalEvente(prev => prev.filter(evnt => evnt.$id !== response.payload.$id));
                }
            }

            // If event is updated
            if (response.events.includes("databases.*.collections.*.documents.*.update")) {
                if (response.payload.scope === "for_all") {
                    setExternalEvente(prev => prev.filter(evnt => evnt.$id !== response.payload.$id));
                    setExternalEvente(prev => [response.payload, ...prev]);
                }
            }
            // console.log(response);
        });

        // Closes the subscription.
        return () => {
            unsubscribe();
        }
    }, [events]);

    return (
        <SafeAreaView className='bg-white flex-1'>
            <Appbar.Header statusBarHeight={0} className='bg-white'>
                <Appbar.Content title="Other Events" titleStyle={{ fontWeight: '600' }} />
            </Appbar.Header>
            <Divider />

            {externalEvente.length === 0
                ?
                <View className=' flex-1 py-3 px-2 '>
                    <View className=' flex-1 my-auto'>
                        <Image source={require('../../assets/no_external_events_yet.jpg')} className='w-full h-5/6' />
                        <Text className=' text-center text-2xl self-center font-medium my-auto text-slate-800'>No external events yet</Text>
                    </View>
                </View>
                :
                <View className='flex-1 bg-zinc-100'>
                    <View className=' py-2 flex-1'>
                        <View className=''>
                            <FlatList
                                className=''
                                keyExtractor={(item, index) => item.$id}
                                data={externalEvente}
                                renderItem={({ item }) => (
                                    <EventCard
                                        buttonLabel={isOrganizer ? 'Read More' : 'Book Now'}
                                        imageUrl={item.poster.toString()}
                                        title={item.event_name}
                                        date={UTC2date(item.event_starts)}
                                        organizer={item.organizer_name.university.name}
                                        time={UTC2time(item.event_starts)}
                                        price={item.price}
                                        description={item.event_description}
                                        onPress={() => navigation.navigate('event_screen', { cardDetails: item })} />
                                )}
                            />
                        </View>
                    </View>
                </View>
            }


        </SafeAreaView>
    )
}

export default OthersTab