import React, { useCallback, useState } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Button, Divider, Appbar, TextInput, Icon } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAppwrite from '../context/appwriteAuthContext'
import { ScrollView } from 'react-native'

const NUM_OF_LINES = 3;

function EventScreen({ navigation, route }) {

    const { user: { isOrganizer } } = useAppwrite();
    const [showMore, setShowMore] = useState(false);
    const [numberOfLines, setNumberOfLines] = useState(null);

    // const handleTextLayout = useCallback((event) => {
    //     const { lines } = event.nativeEvent;
    // console.log('🚪 open?: ', showMore);

    //     setShowMore(lines.length > NUM_OF_LINES);
    // }, []);

    const handleTextLayout = ((event) => {
        const { lines } = event.nativeEvent;
        console.log('layout:::line', lines.length);
        // console.log('🚪 layout:::open?: ', showMore);
        // setShowMore(lines.length > NUM_OF_LINES);
        setNumberOfLines(lines.length);
        // console.log('#lines-->', numberOfLines);
        // console.log('🚪 layout:::open?: ', showMore);

    });

    const handleShowMore = () => {
        // console.log('🚪 open?: ', showMore);
        setShowMore((pv) => !pv);
        // console.log('🚪 open?: ', showMore);
    };

    // console.log(route.params);
    const { cardDetails: { name, poster, price, organizer, description } } = route.params;

    return (
        <SafeAreaView className='bg-white flex-1'>

            <Appbar.Header className='bg-white'>
                <Appbar.BackAction onPress={() => navigation.pop()} />
                <Appbar.Content title={name} />
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
                    {/* {
                        showMore ? (
                            <ScrollView className='max-h-48 '>
                                <Text className=' text-justify' onTextLayout={handleTextLayout}>
                                    {description}
                                </Text>
                            </ScrollView>
                        )
                            : (
                                <Text numberOfLines={NUM_OF_LINES} style={{ textAlign: 'justify' }}>
                                    {description}
                                </Text>

                            )
                    } */}

                    {showMore ?
                        <ScrollView className='max-h-48 '>
                            <Text className=' text-justify bg-green-300' onTextLayout={handleTextLayout}>
                                {description}
                            </Text>
                        </ScrollView>
                        :
                        <Text numberOfLines={NUM_OF_LINES} onTextLayout={handleTextLayout} className='text-justify bg-red-300'>
                            {description}
                        </Text>
                    }

                    {numberOfLines > NUM_OF_LINES &&
                        <>
                            <TouchableOpacity onPress={handleShowMore}>
                                <Text className='text-violet-600'>
                                    {showMore ? 'Show less' : 'Show more'}
                                </Text>
                            </TouchableOpacity>
                        </>

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
                    !isOrganizer &&

                    <View className=' flex-1'>
                        <View className=' flex-1'>
                            <Button
                                mode='contained'
                                className='absolute bottom-0 w-full rounded-md'
                                onPress={() => console.log('PAYMENT LOGIC HERE...')}
                            >
                                {price === 0 ? 'Register For Free' : 'Book Tickets Now'}
                            </Button>
                        </View>
                    </View>
                }
            </View>
        </SafeAreaView>

    )
}

export default EventScreen