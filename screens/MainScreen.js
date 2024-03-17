import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { TextInput } from 'react-native-paper'

// Bottom Tabs
import HomeTab from "./tabs/HomeTab"
import MyEventsTab from "./tabs/MyEventsTab"
import OthersTab from "./tabs/OthersTab"

const Tab = createMaterialBottomTabNavigator();

export default function MainScreen() {
    return (
        <Tab.Navigator
            barStyle={{ backgroundColor: 'white' }}
        >
            <Tab.Screen
                name="home_tab"
                component={HomeTab}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <TextInput.Icon icon={focused ? 'home' : 'home-outline'} />
                    ),
                }}
            />

            <Tab.Screen
                name="my_events_tab"
                component={MyEventsTab}
                options={{
                    tabBarLabel: 'My Events',
                    tabBarIcon: ({ focused }) => (
                        <TextInput.Icon icon={focused ? 'ticket-confirmation' : 'ticket-confirmation-outline'} />
                    ),
                }}
            />

            <Tab.Screen
                name="others_tab"
                component={OthersTab}
                options={{
                    tabBarLabel: 'Others',
                    tabBarIcon: ({ focused }) => (
                        <TextInput.Icon icon={focused ? 'compass' : 'compass-outline'} />
                    ),
                }}
            />

        </Tab.Navigator>
    );
}