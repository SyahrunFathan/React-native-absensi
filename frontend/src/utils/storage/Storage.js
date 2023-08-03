import AsyncStorage from "@react-native-async-storage/async-storage";

export const setData = async(key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
        console.error(error);
    }
}

export const getData = async(key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if(value !== null){
            return JSON.parse(value)
        }
    } catch (error) {
        console.error(error);
    }
}

export const removeData = async(key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (error) {
        console.error(error);
    }
}