import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainScreen from "../screens/MainScreen"
import EventScreen from "../screens/EventScreen"
import AddAnoucementScreen from "../screens/AddAnoucementScreen";
import NoticeScreen from "../screens/NoticeScreen";
import AddNewEventScreen from "../screens/AddNewEventScreen";
import { RegisteredEventsProvider } from "../context/registeredEventsContext";
import MyEventScreen from "../screens/MyEventScreen";
import ScanQRScreen from "../screens/ScanQRScreen";
import useAppwrite from "../context/appwriteAuthContext";
import BuySubscription from "../screens/BuySubscription";

const Stack = createNativeStackNavigator();

const AppStack = () => {
    const { user: { uniSubscribed, university } } = useAppwrite();

    if (!uniSubscribed) {
        return <BuySubscription university={university} />
    }

    return (
        <RegisteredEventsProvider>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="main_screen" component={MainScreen} />
                <Stack.Screen name="event_screen" component={EventScreen} />
                <Stack.Screen name="add_event_screen" component={AddNewEventScreen} />
                <Stack.Screen name="add_anoucement_screen" component={AddAnoucementScreen} />
                <Stack.Screen name="notice_screen" component={NoticeScreen} />
                <Stack.Screen name="my_event_screen" component={MyEventScreen} />
                <Stack.Screen name="scan_ticket_screen" component={ScanQRScreen} />
            </Stack.Navigator>
        </RegisteredEventsProvider>

    );
}

export default AppStack;