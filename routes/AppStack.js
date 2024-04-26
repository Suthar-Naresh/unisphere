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

// Remove below all 👇
import React from 'react'
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";

function Demodemo() {
    const fire = async () => {
        try {
            const postData = {
                "email": "aasthapatel@pdpu.ac.in",
                "contact": "9876345210",
                "university": "Indus University"
            }

            const res = await fetch('http://192.168.38.51:3000/api/check', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            console.log('🚀🚀🚀🚀🚀');

            console.log(res);

            const data = await res.json();

            console.log(data);
        } catch (error) {
            console.log('💣💣', error);
        }

    }
    return (
        <SafeAreaView>
            <View>
                <Text>Test for website!!</Text>
                <Text>Make fetch call to local website and collect the data!!!!!!</Text>
            </View>
            <Button onPress={fire} mode="contained-tonal">Fire 🔥</Button>
        </SafeAreaView>
    )
}
// Remove above all ☝️


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
                {/* <Stack.Screen name="main_screen" component={Demodemo} /> */}
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