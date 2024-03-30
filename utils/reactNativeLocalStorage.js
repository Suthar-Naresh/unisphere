const reactNativeLocalStorage = {
    getItem: async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value;
        } catch (error) {
            console.error('Error getting item from AsyncStorage:', error);
            return null;
        }
    },
    setItem: async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error('Error setting item in AsyncStorage:', error);
        }
    },
    removeItem: async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing item from AsyncStorage:', error);
        }
    },
    clear: async () => {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    }
};

export default reactNativeLocalStorage