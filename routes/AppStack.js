import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import Main from "../screens/Main";

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="main" component={Main} />
        </Stack.Navigator>
    );
}

export default AppStack;