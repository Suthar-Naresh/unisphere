import { PaperProvider } from "react-native-paper";
import { AppwriteProvider } from "./context/appwriteAuthContext";
import { removeSessionDuringDevlopment } from "./utils/devOnly";
import Router from "./routes/Router";

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