import { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import useAppwrite from '../../context/appwriteAuthContext'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EventCard from '../../components/EventCard';
import AppBarWithDialog from '../../components/AppBarWithDialog';
import dbService from '../../appwrite/db';
import { UTC2date, UTC2time } from '../../utils/dateTimeFormat';
import AddEventFab from '../../components/AddEventFab';


function HomeTab({ navigation }) {
    const { auth, setIsLoggedIn, setIsLoading, user: { name, email, university } } = useAppwrite();

    const [eventsList, setEventsList] = useState([]);

    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    useEffect(() => {
        console.log('😒😒😒😒😒😒😒😒');
        setIsLoading(true);
        dbService.allEvents().then((res) => {
            const allevnts = res.documents;
            setEventsList(allevnts)
        });
        setIsLoading(false);
    }, []);

    const handleLogout = () => {
        auth.logout().then(() => {
            AsyncStorage.removeItem('appwriteSession').then(() => {
                console.log('Logged Out');
                setIsLoggedIn(false);
            })
        });
    }

    return (
        <SafeAreaView className='flex-1'>

            <AppBarWithDialog
                visible={visible}
                handleLogout={handleLogout}
                hideDialog={hideDialog}
                showDialog={showDialog}
            />
            <AddEventFab >

                <View className='flex-1'>
                    <Text className='p-2 text-2xl font-bold'>Upcoming events</Text>

                    <View className=' py-2 flex-1'>
                        <View className=''>
                            <FlatList
                                className=''
                                keyExtractor={(item, index) => item.$id}
                                data={eventsList}
                                // ListFooterComponent={<View className='h-64' />}
                                renderItem={({ item }) => (
                                    // console.log(typeof item.toString())
                                    <EventCard
                                        imageUrl={item.poster.toString()}
                                        title={item.name}
                                        date={UTC2date(item.date)}
                                        organizer={item.organizer}
                                        time={UTC2time(item.date)}
                                        price={item.price}
                                        description={item.description}
                                        onPress={() => navigation.navigate('event_screen', { cardDetails: item })} />
                                )}
                            />
                        </View>
                    </View>
                </View>
                
            </AddEventFab>
        </SafeAreaView>
    )
}

export default HomeTab