import { FlatList, Image, Text, View } from 'react-native'
import { Appbar, Divider } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import useRegisteredEvents from '../../context/registeredEventsContext'
import { useEffect, useState } from 'react';
import dbService from '../../appwrite/db';
import { Query } from 'appwrite';
import EventCard from '../../components/EventCard';
import { UTC2date, UTC2time } from '../../utils/dateTimeFormat';

function MyEventsTab() {
    const { events } = useRegisteredEvents();
    const [myEvents, setMyEvents] = useState([]);

    useEffect(() => {
        if (events.length > 0) {
            dbService.getAllregisteredEventsDetails(
                [
                    Query.equal('$id', events)
                ]
            ).then(res => {
                console.log('my events:::::::>', res.documents);
                setMyEvents(res.documents);
            });
        }

    }, [events]);


    return (
        <SafeAreaView className='bg-white flex-1'>
            <Appbar.Header statusBarHeight={0} className='bg-white'>
                <Appbar.Content title="My Events" titleStyle={{ fontWeight: '600' }} />
            </Appbar.Header>
            <Divider />

            {
                events.length === 0
                    ?
                    <View className=' flex-1 py-3 px-2 '>
                        <View className=' flex-1 my-auto'>
                            <Image source={require('../../assets/no_events.jpg')} className='w-full h-5/6' />
                            <Text className=' text-center text-2xl self-center font-medium my-auto text-slate-800'>Nothing in your events</Text>
                        </View>
                    </View>
                    :
                    <View className='flex-1'>
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
                                            date={UTC2date(item.date)}
                                            organizer={item.organizer_name.name}
                                            time={UTC2time(item.date)}
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

export default MyEventsTab