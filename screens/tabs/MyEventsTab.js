import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Drawer } from 'react-native-paper'

function MyEventsTab() {
    const [active, setActive] = React.useState('');

    return (
        <SafeAreaView>

            <Drawer.Section title="Some title">
                <Drawer.Item
                    label="First Item"
                    active={active === 'first'}
                    onPress={() => setActive('first')}
                />
                <Drawer.Item
                    style={{ backgroundColor: '#64ffda' }}
                    icon="star"
                    label="Second Item"
                    active={active === 'second'}
                    onPress={() => setActive('second')}
                />
            </Drawer.Section>
            <View className='bg-emerald-300 h-screen border-emerald-700 border-2'>
                <Text>My events</Text>
            </View>
        </SafeAreaView>
    )
}

export default MyEventsTab