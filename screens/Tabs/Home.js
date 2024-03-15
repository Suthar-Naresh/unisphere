import { Appbar, Button } from 'react-native-paper';
import { FlatList, Image, Text, View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dbService from '../../appwrite/db';
import bucketService from '../../appwrite/bucket';
import FabBtn from '../../.zzzzzz/fab'
import useAppwrite from '../../context/appwriteAuthContext';

const HomeTab = () => {
    const { auth, setIsLoggedIn, setIsLoading, user: { name, email } } = useAppwrite();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        dbService.allEvents().then((res) => {
            const allevnts = res.documents;
            setEvents(allevnts)
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

    // bucketService.getPoster('65d8b5df4209f054fb58').then((res) => {
    //     console.log(res);
    // })

    const renderItem = ({ item }) => (
        <View className=' flex flex-row p-1 rounded-md shadow-lg mt-5 border'>
            <View className='items-center justify-center p-2'>
                <Image className='w-28 h-28 bg-gray-400 rounded-md' source={{ uri: undefined }} />
            </View>
            <View className=' w-full p-1'>
                <Text className='font-semibold text-2xl'>{item.name}</Text>
                <Text className=''>{item.organizer}</Text>
                <Text className=''>{item.description}</Text>
                <Text className=''>{item.date}</Text>
                <Button
                    icon="ticket"
                    mode="contained"
                    className="w-3/5 rounded-md mt-3"
                    onPress={() => { }}
                >
                    Book
                </Button>
            </View>
        </View>
    );

    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="UniSphere" />
                <Appbar.Action icon="account" onPress={handleLogout} />
            </Appbar.Header>

            <View className='p-3 flex-1'>
                <Text className='text-xl font-semibold'>
                    Welcome {name}!
                    Teams: {email}
                </Text>

                <Text className='text-2xl font-semibold mt-8 mb-2'>
                    Upcoming Events
                </Text>

                <FlatList
                    data={events}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.$id}
                    ListEmptyComponent={() => <Text>No events found</Text>}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            {/* <FabBtn/> */}
        </>
    );
}

export default HomeTab