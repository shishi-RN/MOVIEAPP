import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "REACT_QUERY_OFFLINE_CACHE";

export async function saveCache(data) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save cache", error);
  }
}

export async function loadCache() {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : undefined;
  } catch (error) {
    console.error("Failed to load cache", error);
    return undefined;
  }
}
export const storeData = async (data) => {
  try {
    await AsyncStorage.setItem("lastSearchResults", JSON.stringify(data));
  } catch (error) {
    console.error("Error storing data", error);
  }
};

export const retrieveData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("lastSearchResults");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error("Error retrieving data", error);
  }
};