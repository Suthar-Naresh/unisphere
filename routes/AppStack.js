import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainScreen from "../screens/MainScreen"
import EventScreen from "../screens/EventScreen"
import AddNewEvent from "../screens/AddNewEvent";
import AddAnoucement from "../screens/AddAnoucement";

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="main_screen" component={MainScreen} />
            <Stack.Screen name="event_screen" component={EventScreen} />
            <Stack.Screen name="add_event_screen" component={AddNewEvent} />
            <Stack.Screen name="add_anoucement_screen" component={AddAnoucement} />
        </Stack.Navigator>
    );
}

export default AppStack;