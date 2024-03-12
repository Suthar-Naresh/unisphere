import { NavigationContainer } from "@react-navigation/native";

// AppwriteContext hook
import useAppwrite from "../context/appwriteContext";

// Routes
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

const Router = () => {
    const { loggedIn } = useAppwrite();

    return (
        <NavigationContainer >
            {loggedIn ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default Router