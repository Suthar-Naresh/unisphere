import { useEffect, useState } from 'react'
import useAppwrite from '../../context/appwriteAuthContext'
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBarWithDialog from '../../components/AppBarWithDialog';
import dbService from '../../appwrite/db';
import AddEventFab from '../../components/AddEventFab';
import EventList from '../../components/EventsList';
import TopTab from './TopTab';
import { FlatList, Text, View } from 'react-native';
import { Client } from 'appwrite';
import conf from '../../conf/conf';
import { ActivityIndicator, Button, Card, TextInput, Title } from 'react-native-paper';
import useRegisteredEvents from '../../context/registeredEventsContext';
import { useNavigation } from '@react-navigation/native';
import { UTC2date } from '../../utils/dateTimeFormat';

function Event() {
    const { auth, setIsLoading, user: { isOrganizer, university } } = useAppwrite();
    const { events } = useRegisteredEvents();

    const [eventsList, setEventsList] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchEvents = () => {
        console.log('😒😒😒😒😒😒😒😒');
        setIsLoading(true);
        dbService.allEvents().then((res) => {

            const allevnts = res.documents;
            const filteredListByUni = allevnts.filter(evnt => evnt.university_name.name === university);
            const filteredList = filteredListByUni.filter(evt => !events.includes(evt.$id));

            console.log(res);
            setEventsList(filteredList)
            // console.log(allevnts);
        });
        setIsLoading(false);
    }

    useEffect(() => {
        // setLoading(true);
        fetchEvents();
        // setLoading(false);

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
    }, [events]);


    // if (loading) {
    //     return <ActivityIndicator className='my-auto' />;
    // }

    return (
        isOrganizer
            ?
            <EventList data={eventsList} buttonLabel='Read More' />
            :
            <EventList data={eventsList} buttonLabel='Book Now' />
    )
}

function NoticeCard({ onPress, title, description, organizer, noticeDate }) {

    return (
        <Card style={{ margin: 16 }} contentStyle={{ margin: 16 }}>
            <View className='flex flex-row justify-between items-center'>
                <Title className='font-bold text-xl'>{title}</Title>
            </View>

            <Card.Content className='space-y-3'>
                <View className=' flex flex-row items-center justify-between'>
                    <Text variant="titleLarge">{organizer}</Text>
                    <View className='space-x-8'>
                        <TextInput.Icon icon='calendar' />
                        <Text variant="titleLarge">{UTC2date(noticeDate)}</Text>
                    </View>
                </View>
                <Text variant="titleLarge" numberOfLines={3}>{description}</Text>
            </Card.Content>

            <Card.Actions>
                <Button mode='contained' className='rounded-md' onPress={onPress} >Read</Button>
            </Card.Actions>
        </Card>
    )
}

function Notice() {
    const { navigate } = useNavigation();
    const [notices, setNotices] = useState([]);
    const {  user: { university } } = useAppwrite();

    useEffect(() => {
        dbService.getAnnouncements().then(res => {
            console.log(res);
            setNotices(res.documents.filter(ntc=>ntc.university.name===university));
        })
        console.log('notice....');
    }, [])

    return (
        <FlatList
            className=''
            keyExtractor={(item, index) => item.$id}
            data={notices}
            renderItem={({ item }) => (
                <NoticeCard
                    description={item.description}
                    title={item.title}
                    noticeDate={item.date}
                    organizer={item.organizer.name}
                    onPress={() => navigate('notice_screen', { cardDetails: item })}
                />
            )}
        />

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