import EventCard from './EventCard';
import { UTC2date, UTC2time } from '../utils/dateTimeFormat';
import { Text, View, FlatList } from 'react-native'
import AddEventFab from './AddEventFab'
import { useNavigation } from '@react-navigation/native';

function EventsList({ data, buttonLabel }) {
    const navigation = useNavigation();
    
    return (
        // <AddEventFab>
            <View className='flex-1'>
                <Text className='p-2 text-2xl font-bold'>Upcoming events</Text>
                <View className=' py-2 flex-1'>
                    <View className=''>
                        <FlatList
                            className=''
                            keyExtractor={(item, index) => item.$id}
                            data={data}
                            // ListFooterComponent={<View className='h-64' />}
                            renderItem={({ item }) => (
                                // console.log(typeof item.toString())
                                <EventCard
                                    buttonLabel={buttonLabel}
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

        // </AddEventFab>
    )
}

export default EventsList