import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_LOCALSTORAGE = "COLLECTIONS_CACHE";

const setLocalStorage = async (value: any) => {
    const jsonValue = JSON.stringify(value)
    try {
        await AsyncStorage.setItem(KEY_LOCALSTORAGE, jsonValue)
    } catch (e) {
        // saving error
        console.log("Errorcito: ", e);

    }
}

const getLocalStorage = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(KEY_LOCALSTORAGE)
        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
        // error reading value
        console.log("Errorcito: ", e);
    }
}

export { setLocalStorage, getLocalStorage }