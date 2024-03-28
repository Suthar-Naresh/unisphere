import { createContext, useContext, useEffect, useState } from "react";
import auth from "../appwrite/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";
import teamService from "../appwrite/team";
import conf from "../conf/conf";
import dbService from "../appwrite/db";
import useAppwrite from "./appwriteAuthContext";

const INIT_STATE = {
    events: [],
    setRegisteredEvents: () => { }
};

export const RegisteredEventsContext = createContext(INIT_STATE);

export const RegisteredEventsProvider = ({ children }) => {
    const { user: { id } } = useAppwrite();
    const [registeredEvents, setRegisteredEvents] = useState([]);

    useEffect(() => {
        dbService.getAllregisteredEvents(id).then(res => {
            // console.log('registered events::::',res);
            const regEvnts = res.documents.map(evnts => evnts.event_id);
            setRegisteredEvents(regEvnts);
            // console.log('arrrrrrrrrrrr',rrr);
        }).catch(e => console.log(e))
    }, [])


    const value = {
        events: registeredEvents,
        setRegisteredEvents
    };

    return (
        <RegisteredEventsContext.Provider value={value}>
            {children}
        </RegisteredEventsContext.Provider>
    );
}

export default function useRegisteredEvents() {
    return useContext(RegisteredEventsContext)
}