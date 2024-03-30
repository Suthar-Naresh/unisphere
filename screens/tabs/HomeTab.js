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
import { Button, Card, TextInput, Title } from 'react-native-paper';

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
    const desc = 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.    '
    useEffect(() => {
        console.log('notice....');
    }, [])
    return (
        <View>
            <Text>Notice</Text>
            <Card style={{ margin: 16 }} contentStyle={{ margin: 16 }}>
                <View className='flex flex-row justify-between items-center'>
                    <Title className='font-bold text-xl'>{'Cancellation of MSE '}</Title>
                </View>

                <Card.Content className='space-y-3'>
                    <View className=' flex flex-row items-center justify-between'>
                        <Text variant="titleLarge">{'Student Corner'}</Text>
                        <View className='space-x-8'>
                            <TextInput.Icon icon='calendar' />
                            <Text variant="titleLarge">{'22 Feb, 2024'}</Text>
                        </View>
                    </View>
                    <Text variant="titleLarge" numberOfLines={3}>{desc}</Text>
                </Card.Content>

                <Card.Actions>
                    <Button mode='contained' className='rounded-md' onPress={() => { }} >{'Read'}</Button>
                </Card.Actions>

            </Card>
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