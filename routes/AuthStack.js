import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen"
import SignUpScreen from "../screens/SignUpScreen"

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login_screen" component={LoginScreen} />
      <Stack.Screen name="signup_screen" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

export default AuthStack;