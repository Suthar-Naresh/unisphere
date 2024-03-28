import EventCard from './EventCard';
import { UTC2date, UTC2time } from '../utils/dateTimeFormat';
import { Text, View, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native';

function EventsList({ data, buttonLabel }) {
    const navigation = useNavigation();

    console.log('data in eventslist--> ', data);

    return (
        <View className='flex-1'>
            <View className=' py-2 flex-1'>
                <View className=''>
                    <FlatList
                        className=''
                        keyExtractor={(item, index) => item.$id}
                        data={data}
                        renderItem={({ item }) => (
                            <EventCard
                                buttonLabel={buttonLabel}
                                imageUrl={item.poster.toString()}
                                title={item.event_name}
                                date={UTC2date(item.date)}
                                organizer={item.organizer_name.name}
                                time={UTC2time(item.date)}
                                price={item.price}
                                description={item.event_description}
                                onPress={() => navigation.navigate('event_screen', { cardDetails: item })} />
                        )}
                    />
                </View>
            </View>
        </View>
    )
}

export default EventsList