import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Button, Divider, Appbar, TextInput, Icon, ActivityIndicator, Portal, Dialog, PaperProvider, Modal } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAppwrite from '../context/appwriteAuthContext'
import { ScrollView } from 'react-native'
import dbService from '../appwrite/db'
import useRegisteredEvents from '../context/registeredEventsContext'
import { UTC2date, UTC2time } from '../utils/dateTimeFormat'
import QRCode from 'react-native-qrcode-svg';
import DataTableForStat from '../components/DataTableForStat'


const NUM_OF_LINES = 3;

function beytifyDateTime(utcstring) {
    const date = new Date(utcstring);
    return `${date.toDateString()} at ${date.toLocaleTimeString()}`;
}

function MyEventScreen({ navigation, route }) {

    const { user: { isOrganizer, docID } } = useAppwrite();

    const [showMore, setShowMore] = useState(false);
    const [numberOfLines, setNumberOfLines] = useState(null);

    const [qrVisible, setQrVisible] = useState(false);
    const showQR = () => setQrVisible(true);
    const hideQR = () => setQrVisible(false);


    const [visible, setVisible] = useState(false);

    const showStat = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };

    const [statData, setStatData] = useState([]);

    const { cardDetails: { $id, event_name, poster, price, venue, event_starts, event_ends, registration_start, registration_end, organizer_name: { name: organizer }, event_description } } = route.params;

    const qrData = {
        student_id: docID,
        event_id: $id
    }

    useEffect(() => {
        // generate qr data...
        dbService.getStats().then(res => {
            console.log(res);
            const dataForStats = res.map(st => ({
                key: st.$id,
                name: st.name,
                email: st.email,
                university: st.university,
            }));

            setStatData(dataForStats);
        }).catch(e => console.log(e))
    }, []);

    const handleTextLayout = useCallback((event) => {
        const { lines } = event.nativeEvent;
        setNumberOfLines(lines.length);
    }, []);

    const handleShowMore = () => {
        setShowMore((pv) => !pv);
    };

    const scanQR = () => navigation.navigate("scan_ticket_screen", { event_name, $id });

    return (
        <SafeAreaView className='bg-white flex-1'>

            <Appbar.Header statusBarHeight={0} className='bg-white'>
                <Appbar.BackAction onPress={() => navigation.pop()} />
                <Appbar.Content title={event_name} />
            </Appbar.Header>

            <PaperProvider>
                <View className='flex-1 p-3 '>

                    <View className='h-1/4 rounded-md shadow-md shadow-black ' >
                        <Image source={{ uri: poster.toString() }} className='w-full rounded-md h-full object-cover' />
                    </View>

                    <View className='flex flex-row items-baseline justify-between mt-6 mb-2'>
                        <Text className='font-bold text-xl text-gray-800'>
                            {price === 0 ? 'Free' : <><Icon source="currency-inr" size={22} />{price}</>}
                        </Text>
                        <Text className='font-medium text-sm text-gray-600'>{organizer}</Text>
                    </View>

                    <Divider />

                    <Text className='my-2 font-semibold text-xl text-gray-800'>Description</Text>


                    <View>

                        {showMore ?
                            <ScrollView className='max-h-48 '>
                                <Text className=' text-justify' onTextLayout={handleTextLayout}>
                                    {event_description}
                                </Text>
                            </ScrollView>
                            :
                            <Text numberOfLines={NUM_OF_LINES} onTextLayout={handleTextLayout} className='text-justify'>
                                {event_description}
                            </Text>
                        }

                        {numberOfLines > NUM_OF_LINES &&
                            <TouchableOpacity onPress={handleShowMore}>
                                <Text className='text-violet-600'>
                                    {showMore ? 'Show less' : 'Show more'}
                                </Text>
                            </TouchableOpacity>
                        }

                    </View>

                    <Text className='mt-4 underline font-semibold text-gray-700 text-md'>Registration details</Text>
                    <View className='mt-1 flex flex-row justify-between items-center'>
                        <View className='space-x-8 '>
                            <TextInput.Icon icon='calendar-clock-outline' className='mt-5' />
                            <Text variant="titleLarge">{UTC2date(registration_start)} at {UTC2time(registration_start)}</Text>
                            <Text variant="titleLarge">{UTC2date(registration_end)} at {UTC2time(registration_end)}</Text>
                        </View>
                    </View>

                    <Text className='mt-4 underline font-semibold text-gray-700 text-md'>Event details</Text>
                    <View className='mt-1 flex flex-row justify-between items-center'>
                        <View className='space-x-8 '>
                            <TextInput.Icon icon='calendar-clock-outline' className='mt-5' />
                            <Text variant="titleLarge">{UTC2date(event_starts)} at {UTC2time(event_starts)}</Text>
                            <Text variant="titleLarge">{UTC2date(event_ends)} at {UTC2time(event_ends)}</Text>
                        </View>
                    </View>

                    <View className='mt-1 space-y-4'>
                        <View className='space-x-8'>
                            <TextInput.Icon icon='map-marker-outline' />
                            <Text variant="titleLarge">{venue}</Text>
                        </View>
                    </View>

                    {
                        isOrganizer
                            ?
                            <>
                                <Portal className=''>
                                    <Modal visible={visible} className='flex-1' onDismiss={hideModal} contentContainerStyle={containerStyle}>
                                        <DataTableForStat dataForTable={statData} />
                                    </Modal>
                                </Portal>
                            </>
                            :
                            <>
                                <Portal>
                                    <Dialog visible={qrVisible} onDismiss={hideQR}>
                                        <Dialog.Icon icon="ticket-confirmation-outline" size={70} />
                                        <Dialog.Content className='bg-red- mx-auto'>
                                            <View className='bg-white p-5 border-2 border-dotted '>
                                                <QRCode size={200} value={JSON.stringify(qrData)} />
                                            </View>
                                        </Dialog.Content>
                                    </Dialog>
                                </Portal>
                            </>
                    }
                    <View className=' flex-1'>
                        <View className='flex-1'>
                            <View className='flex flex-row space-x-3 absolute bottom-0'>

                                {isOrganizer && <Button onPress={scanQR} icon='qrcode-scan' mode='contained' className=' rounded-md'>Scan</Button>}

                                <Button
                                    mode='contained'
                                    className='rounded-md flex-1'
                                    onPress={isOrganizer ? showStat : showQR}
                                >
                                    {isOrganizer ? 'Stats' : 'Show ticket'}
                                </Button>
                            </View>

                        </View>
                    </View>
                </View>
            </PaperProvider>

        </SafeAreaView>

    )
}

export default MyEventScreen