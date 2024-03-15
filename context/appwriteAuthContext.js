import { createContext, useContext, useEffect, useState } from "react";
import auth from "../appwrite/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";

const INIT_USER = {
    id: "",
    name: "",
    email: "",
    university: "",
    teams: [],
    labels: [],
};

const INIT_STATE = {
    user: INIT_USER,
    isLoading: false,
    isLoggedIn: false,
    auth,
    setUser: () => { },
    setIsLoading: () => { },
    setIsLoggedIn: () => { },
    setSessionDetails: async () => { },
};

export const AppWriteContext = createContext(INIT_STATE);

export const AppwriteProvider = ({ children }) => {
    const [user, setUser] = useState(INIT_USER);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const setSessionDetails = async () => {
        const sessionInfo = await auth.getCurrentUser();
        if (sessionInfo) {
            console.log('User is already logged in');

            // Set the user context using session info
            setUser({
                id: sessionInfo.$id,
                name: sessionInfo.name,
                email: sessionInfo.email,
                university: "Some Uni",
                labels: sessionInfo.labels,
                teams: [],
            });

        } else {
            console.log('Session expired, require login');
        }
    }

    const checkStoredSession = async () => {
        setIsLoading(true);

        try {
            // Check if user session exists
            const sessionDetails = await AsyncStorage.getItem('appwriteSession');
            console.log('----> Session Details');

            if (sessionDetails) {
                console.log('Found stored session details:', sessionDetails);

                // set the user details in ctx
                await setSessionDetails();
                setIsLoggedIn(true);

            } else {
                console.log('No stored session details found, require login');
            }
        } catch (error) {
            console.error('Error reading stored session details:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log('🖐️ effect in context');
        checkStoredSession();
    }, []);

    const value = {
        user,
        isLoggedIn,
        auth,
        isLoading,
        setIsLoading,
        setUser,
        setIsLoggedIn,
        setSessionDetails
    };

    return (
        <AppWriteContext.Provider value={value}>
            {isLoading ? <Loading /> : children}
        </AppWriteContext.Provider>
    );
}

export default function useAppwrite() {
    return useContext(AppWriteContext)
}