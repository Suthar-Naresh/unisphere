import { PaperProvider } from "react-native-paper";
import { AppwriteProvider } from "./context/appwriteAuthContext";
import { removeSessionDuringDevlopment } from "./utils/devOnly";
import Router from "./routes/Router";
import { StripeProvider } from '@stripe/stripe-react-native';
import storage from "local-storage-fallback";
import { registerTranslation } from 'react-native-paper-dates'
import AsyncStorage from "@react-native-async-storage/async-storage";

registerTranslation('in', {
  save: 'Select',
  selectSingle: 'Select date',
  selectMultiple: 'Select dates',
  selectRange: 'Select period',
  notAccordingToDateFormat: (inputFormat) =>
    `Date format must be ${inputFormat}`,
  mustBeHigherThan: (date) => `Must be later then ${date}`,
  mustBeLowerThan: (date) => `Must be earlier then ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Must be between ${startDate} - ${endDate}`,
  dateIsDisabled: 'Day is not allowed',
  previous: 'Previous',
  next: 'Next',
  typeInDate: 'Type in date',
  pickDateFromCalendar: 'Pick date from calendar',
  close: 'Close',
})

const STRIPE_PUBLISHABLE_KEY = "pk_test_51Ow93mSGAmc9SzQrCWUveefzVXDp3OBb8mxLHk1OrlKqUJ7cpEBP705xPIz1cpeZJvzsrVkp0AWciWUHCAu5tLsr0022eIPtXQ";

export default function App() {
  if (!('localStorage' in window)) {
    window.localStorage = storage;
  }
  // removeSessionDuringDevlopment();
  console.log('-> Starting the app.');

  return (
    <PaperProvider>
      <AppwriteProvider>
          <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY} >
            <Router />
          </StripeProvider>
      </AppwriteProvider>
    </PaperProvider>
  );
}