import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainScreen from "../screens/MainScreen"
import EventScreen from "../screens/EventScreen"
import AddNewEvent from "../screens/AddNewEvent";
import AddAnoucement from "../screens/AddAnoucement";
import { RegisteredEventsProvider } from "../context/registeredEventsContext";
import NoticeScreen from "../screens/NoticeScreen";

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <RegisteredEventsProvider>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="main_screen" component={MainScreen} />
                <Stack.Screen name="event_screen" component={EventScreen} />
                <Stack.Screen name="add_event_screen" component={AddNewEvent} />
                <Stack.Screen name="add_anoucement_screen" component={AddAnoucement} />
                <Stack.Screen name="notice_screen" component={NoticeScreen} />
            </Stack.Navigator>
        </RegisteredEventsProvider>

    );
}

export default AppStack;