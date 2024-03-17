import { useEffect, useState } from 'react'
import useAppwrite from '../../context/appwriteAuthContext'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppBarWithDialog from '../../components/AppBarWithDialog';
import dbService from '../../appwrite/db';
import AddEventFab from '../../components/AddEventFab';
import EventList from '../../components/EventsList';


function HomeTab({ navigation }) {
    const { auth, setIsLoggedIn, setIsLoading, user: { isOrganizer } } = useAppwrite();

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

            {
                isOrganizer
                    ?
                    <AddEventFab>
                        <EventList data={eventsList} buttonLabel='Read More' />
                    </AddEventFab>
                    :
                    <EventList data={eventsList} buttonLabel='Book Now' />
            }


        </SafeAreaView>
    )
}

export default HomeTab