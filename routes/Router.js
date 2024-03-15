import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import Toast from "react-native-toast-message";

// context imports
import useAppwrite from "../context/appwriteAuthContext";

const Router = () => {
    const { isLoggedIn } = useAppwrite();

    return (
        <>
            <NavigationContainer>
                {isLoggedIn ? <AppStack /> : <AuthStack />}
            </NavigationContainer>
            <Toast />
        </>
    )
}

export default Router