import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadCache = async <T>(key: string, fallback: T): Promise<T> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) return JSON.parse(value);
  } catch (_) {}
  return fallback;
};

export const saveCache = async (key: string, data: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (_) {}
};
