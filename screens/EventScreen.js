import React, { useCallback, useState } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Button, Divider, Appbar, TextInput, Icon } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAppwrite from '../context/appwriteAuthContext'
import { ScrollView } from 'react-native'

const NUM_OF_LINES = 3;

function EventScreen({ navigation, route }) {

    const { user: { isOrganizer } } = useAppwrite();
    const [expanded, setExpanded] = useState(false);
    const [numberOfLines, setNumberOfLines] = useState(0);

    const handleTextLayout = useCallback((event) => {
        const { lines } = event.nativeEvent;
        setNumberOfLines(lines.length);
    }, []);

    const handleToggleExpanded = () => {
        if (numberOfLines>NUM_OF_LINES) {
            setExpanded(true);
        }else{

            setExpanded(false);
        }
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
                    {expanded && (
                        <>
                            <ScrollView className='max-h-48 '>
                                <Text className='my-4 text-justify' >
                                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                                    {description}
                                </Text>
                            </ScrollView>

                            <TouchableOpacity onPress={handleToggleExpanded}>
                                <Text>Show Less</Text>
                            </TouchableOpacity>
                        </>
                    )}
                    {!expanded && (
                        <>
                            <Text onTextLayout={handleTextLayout} numberOfLines={NUM_OF_LINES} style={{ textAlign: 'justify' }}>
                                {description}
                            </Text>
                            <TouchableOpacity onPress={handleToggleExpanded}>
                                <Text>Show More</Text>
                            </TouchableOpacity>
                        </>
                    )}
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