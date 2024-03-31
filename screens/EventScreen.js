import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Button, Divider, Appbar, TextInput, Icon, ActivityIndicator } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAppwrite from '../context/appwriteAuthContext'
import { ScrollView } from 'react-native'
import Toast from 'react-native-toast-message'
import PaymentButton, { AlreadyRegisteredButton } from '../components/PaymentButton'
import functionService from '../appwrite/functions'
import { useStripe } from '@stripe/stripe-react-native'
import Loading from '../components/Loading'
import dbService from '../appwrite/db'
import useRegisteredEvents from '../context/registeredEventsContext'

const NUM_OF_LINES = 3;

function EventScreen({ navigation, route }) {

    const { auth, user: { isOrganizer, id } } = useAppwrite();
    const { events, setRegisteredEvents } = useRegisteredEvents();

    const [showMore, setShowMore] = useState(false);
    const [numberOfLines, setNumberOfLines] = useState(null);
    const [freeEvent, setFreeEvent] = useState(true);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loadingPayment, setLoadingPayment] = useState(false);

    const [alreadyRegistered, setAlreadyRegistered] = useState(false);


    const { cardDetails: { $id, event_name, poster, price, organizer_name: { name: organizer }, event_description } } = route.params;

    useEffect(() => {
        setFreeEvent(price === 0);
        setAlreadyRegistered(events.includes($id));
    }, []);

    const handleTextLayout = useCallback((event) => {
        const { lines } = event.nativeEvent;
        setNumberOfLines(lines.length);
    }, []);

    const handleShowMore = () => {
        setShowMore((pv) => !pv);
    };

    const handlePayEvent = async () => {
        setLoadingPayment(true);

        const res = await functionService.createPaymentIntent(price);
        console.log(typeof res);
        console.log(res);
        const paymentIntentClientSecret = JSON.parse(res).paymentIntent

        if (!res) console.log('something went wrong!!!!');

        // initialize payment sheet
        const initResponse = await initPaymentSheet({
            merchantDisplayName: 'UniSphere',
            defaultBillingDetails: { address: { country: 'IN' } },
            paymentIntentClientSecret: paymentIntentClientSecret,
        });

        if (initResponse.error) console.log('error.....');

        // present payment sheet from stripe
        const paymentResponse = await presentPaymentSheet();
        console.log(paymentResponse);

        if (paymentResponse.error) {
            console.log('Pressed close payment sheet.', paymentResponse.error.code);
            setLoadingPayment(false);
            return;
        } else {
            try {
                const res = await dbService.createTransaction(id, $id, paymentIntentClientSecret);
                if (!res) {
                    console.log('something went wrong ☠️');
                }
                console.log('done payment!');
                await handleFreeEvent();

            } catch (error) {
                console.log('ERROR!! 💵💵💵💵', error);
            }

            setLoadingPayment(false);
        }

    }

    const handleFreeEvent = async () => {
        dbService.registerStudentInEvent(id, $id).then(res => {
            if (res) {
                Toast.show({
                    type: 'success',
                    text1: 'Registered successfully!'
                });
                setAlreadyRegistered(true);
                setRegisteredEvents(prev => [$id, ...prev])
            }
        }).catch(e => console.log(e))
    }

    return (
        <SafeAreaView className='bg-white flex-1'>

            <Appbar.Header statusBarHeight={0} className='bg-white'>
                <Appbar.BackAction onPress={() => navigation.pop()} />
                <Appbar.Content title={event_name} />
            </Appbar.Header>

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


                <View className='my-4 flex flex-row justify-between items-center'>
                    <View className='space-x-8'>
                        <TextInput.Icon icon='calendar' />
                        <Text variant="titleLarge">{'24 Feb, 2024'}</Text>
                    </View>
                    <View className='space-x-8'>
                        <TextInput.Icon icon='clock-time-three-outline' />
                        <Text variant="titleLarge">{'03:01 PM - 01:30 AM'}</Text>
                    </View>
                </View>

                <View className='mt-4 space-y-4'>
                    <View className='space-x-8'>
                        <TextInput.Icon icon='calendar-clock-outline' />
                        <Text variant="titleLarge">{'25 Feb 2024 - 1 Mar 2024'}</Text>
                    </View>
                    <View className='space-x-8'>
                        <TextInput.Icon icon='map-marker-outline' />
                        <Text variant="titleLarge">{'Main Building, Auditorium'}</Text>
                    </View>
                </View>

                {
                    !isOrganizer && (
                        alreadyRegistered
                            ?
                            <AlreadyRegisteredButton />
                            :
                            (loadingPayment
                                ? <ActivityIndicator className='flex-1' />
                                : <PaymentButton onPress={freeEvent ? handleFreeEvent : handlePayEvent} free={freeEvent} />)
                    )
                }
            </View>
        </SafeAreaView>

    )
}

export default EventScreen