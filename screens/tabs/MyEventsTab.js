import { FlatList, Image, Text, View } from 'react-native'
import { Appbar, Divider } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import useRegisteredEvents from '../../context/registeredEventsContext'
import { useEffect, useState } from 'react';
import dbService from '../../appwrite/db';
import { Query } from 'appwrite';
import EventCard from '../../components/EventCard';
import { UTC2date, UTC2time } from '../../utils/dateTimeFormat';
import { useNavigation } from '@react-navigation/native';
import useAppwrite from '../../context/appwriteAuthContext';
import OrganizerMyEvents from '../../components/OrganizerMyEvents';
import StudentMyEvents from '../../components/StudentMyEvents';

function MyEventsTab() {
    const { user: { isOrganizer } } = useAppwrite();


    return (
        <SafeAreaView className='bg-white flex-1'>
            <Appbar.Header statusBarHeight={0} className='bg-white'>
                <Appbar.Content title="My Events" titleStyle={{ fontWeight: '600' }} />
            </Appbar.Header>
            <Divider />

            {isOrganizer ? <OrganizerMyEvents /> : <StudentMyEvents />}

        </SafeAreaView>
    )
}

export default MyEventsTab