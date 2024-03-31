import { createContext, useContext, useEffect, useState } from "react";
import dbService from "../appwrite/db";
import useAppwrite from "./appwriteAuthContext";

const INIT_STATE = {
    events: [],
    setRegisteredEvents: () => { }
};

export const RegisteredEventsContext = createContext(INIT_STATE);

export const RegisteredEventsProvider = ({ children }) => {
    const { user: { docID } } = useAppwrite();
    const [registeredEvents, setRegisteredEvents] = useState([]);

    useEffect(() => {
        dbService.getAllregisteredEvents(docID).then(res => {
            // console.log('registered events::::',res);
            const regEvnts = res.documents.map(evnts => evnts.event_id);
            setRegisteredEvents(regEvnts);
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