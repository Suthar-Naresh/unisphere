import AsyncStorage from "@react-native-async-storage/async-storage";

export function removeSessionDuringDevlopment() {
    AsyncStorage.removeItem('appwriteSession').then(() => {
        console.log('------- Session Removed ------');
    });
}