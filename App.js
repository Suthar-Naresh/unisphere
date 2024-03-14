import { ActivityIndicator, PaperProvider } from "react-native-paper";
import Router from "./routes/Router";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Appwrite Context Provider
import { AppwriteProvider } from "./context/appwriteContext";
import { useEffect, useState } from "react";
import auth from "./appwrite/auth"
import Loading from "./components/Loading";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkStoredSession();
  }, []);

  const checkStoredSession = async () => {
    try {
      const sessionDetails = await AsyncStorage.getItem('appwriteSession');

      if (sessionDetails) {
        console.log('Found stored session details:', sessionDetails);
        const sessionInfo = await auth.getCurrentUser();
        if (sessionInfo) {
          console.log('User is already logged in');
          setLoggedIn(true);
          setLoading(false);

        } else {
          console.log('Session expired, require login');
          setLoggedIn(false);
          setLoading(false);
        }
      } else {
        console.log('No stored session details found, require login');
        setLoggedIn(false);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error reading stored session details:', error);
    }
  };

  useEffect(() => {
    console.log('----> LoggedIN?: ', loggedIn);
  }, [loggedIn]);

  return (
    <PaperProvider>
      <AppwriteProvider value={{ loggedIn, setLoggedIn, auth }}>
        {
          loading ?
            <Loading />
            :
            <Router />
        }
      </AppwriteProvider>
    </PaperProvider>
  );
}