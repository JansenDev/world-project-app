import AsyncStorage from '@react-native-async-storage/async-storage';
import { ICollection } from "../domain/models/collection-model";

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

const getLocalStorage = async (): Promise<ICacheData> => {
    try {
        const jsonValue = await AsyncStorage.getItem(KEY_LOCALSTORAGE)
        return jsonValue != null ? JSON.parse(jsonValue) : []
    } catch (e) {
        // error reading value
        console.log("Errorcito: ", e);
        return {} as ICacheData;
    }
}

const cleanLocalStorage = async () => {
    await AsyncStorage.clear()
}


const addCollection = async (newCollections: ICollection[]) => {
    const currentDate = new Date().toLocaleDateString();
    const data = {
        collections: await getColletion(),
        currentDate,
        pages: 1
    }
    data.collections = [...data.collections, ...newCollections]
    await setLocalStorage(JSON.stringify(data))

}

const getColletion = async (): Promise<ICollection[] | []> => {
    const jsonData = await getLocalStorage() || []
    const data = jsonData
    console.log(data);
    console.log("data");

    return data!['collections'].length > 0 ? data!['collections'] : []
}

export interface ICacheData {
    collections: ICollection[]
    currentDate: string
    pages: number
}

export { setLocalStorage, getLocalStorage, cleanLocalStorage, addCollection, getColletion }