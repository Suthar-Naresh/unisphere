import { createContext, useContext, useEffect, useState } from "react";
import auth from "../appwrite/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";
import teamService from "../appwrite/team";
import conf from "../conf/conf";

const INIT_USER = {
    id: "",
    name: "",
    email: "",
    university: "",
    university_id: "",
    docID: "",
    isOrganizer: false
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

            // check for user pref for university
            const { university, university_id, docID } = await auth.getUserPrefInfo();

            // check if user is part of organization team
            const teams = await teamService.getTeamsOfUser();
            const isOrganizer = teams.teams.some(({ $id }) => $id === conf.organizers_team_id);
            // array.some(num => num % 2 === 0)
            // console.log(teams);

            // Set the user context using session info
            setUser({
                id: sessionInfo.$id,
                name: sessionInfo.name,
                email: sessionInfo.email,
                university: university || 'Man i do\'n go to college',
                university_id: university_id,
                isOrganizer: isOrganizer,
                docID
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