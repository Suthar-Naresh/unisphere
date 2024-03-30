import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function TopTab({ Event, Notice }) {
    return (
        <Tab.Navigator
            screenOptions={{
            tabBarPressColor:'#e5e5e5',
            tabBarIndicatorStyle:{backgroundColor:'#5b21b6'}
            }}
        >
            <Tab.Screen name="events_top_tab" component={Event} options={{ title: 'Events' ,}} />
            <Tab.Screen name="notice_top_tab" component={Notice} options={{ title: 'announcements' }} />
        </Tab.Navigator>
    );
}