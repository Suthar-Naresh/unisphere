import { PaperProvider } from "react-native-paper";
import { AppwriteProvider } from "./context/appwriteAuthContext";
import { removeSessionDuringDevlopment } from "./utils/devOnly";
import Router from "./routes/Router";
import { StripeProvider } from '@stripe/stripe-react-native';
import storage from "local-storage-fallback";
import { registerTranslation, en } from 'react-native-paper-dates'
import conf from "./conf/conf";

registerTranslation('en', en)

export default function App() {
  if (!('localStorage' in window)) {
    window.localStorage = storage;
  }
  // removeSessionDuringDevlopment();
  console.log('-> Starting the app.');

  return (
    <PaperProvider>
      <AppwriteProvider>
        <StripeProvider publishableKey={conf.stripe_publishable_key} >
          <Router />
        </StripeProvider>
      </AppwriteProvider>
    </PaperProvider>
  );
}