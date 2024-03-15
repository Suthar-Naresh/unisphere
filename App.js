import { PaperProvider } from "react-native-paper";
import Router from "./routes/Router";
import { AppwriteProvider } from "./context/appwriteAuthContext";
import { removeSessionDuringDevlopment } from "./utils/devOnly";

export default function App() {
  // removeSessionDuringDevlopment();
  console.log('-> Starting the app.');

  return (
    <PaperProvider>
      <AppwriteProvider>
        <Router />
      </AppwriteProvider>
    </PaperProvider>
  );
}