import { createContext, useContext, useEffect, useState } from "react";
import auth from "../appwrite/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";

export const INIT_USER = {
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
    setIsLoggedIn: () => { },
    checkStoredSession: async () => { },
};

export const AppWriteContext = createContext(INIT_STATE);

export const AppwriteProvider = ({ children }) => {
    const [user, setUser] = useState(INIT_USER);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Set user data if any user session exists
    const checkStoredSession = async () => {
        setIsLoading(true);

        try {
            // Check if user session exists
            const sessionDetails = await AsyncStorage.getItem('appwriteSession');
            console.log('----> Session Details');

            if (sessionDetails) {
                console.log('Found stored session details:', sessionDetails);

                const sessionInfo = await auth.getCurrentUser();

                if (sessionInfo) {
                    console.log('User is already logged in');

                    // Set the user context using session info
                    setUser({
                        email: sessionInfo.email,
                        id: sessionInfo.$id,
                        labels: sessionInfo.labels,
                        teams: [],
                        university: "Some Uni",
                        name: sessionInfo.name,
                    });

                    setIsLoggedIn(true);

                } else {
                    console.log('Session expired, require login');
                }
            } else {
                console.log('No stored session details found, require login');
            }
        } catch (error) {
            console.error('Error reading stored session details:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const value = {
        user,
        isLoading,
        isLoggedIn,
        auth,
        setUser,
        setIsLoggedIn,
        checkStoredSession
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