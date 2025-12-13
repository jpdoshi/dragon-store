import AppBar from "@/components/AppBar";
import AppsList from "@/components/AppsList";
import ScreenView from "@/components/ScreenView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { ScrollView, Text, View } from "react-native";

const FAVORITES_KEY = "favorite_apps";

const Favorites = () => {
  const [appList, setAppList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    try {
      const saved = await AsyncStorage.getItem(FAVORITES_KEY);
      const favorites = saved ? JSON.parse(saved) : [];
      setAppList(favorites);
    } catch (err) {
      console.log("Error loading favorites:", err);
    }
  };

  return (
    <ScreenView>
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      >
        <AppBar>
          <View className="flex-1 flex-row items-center justify-between">
            <View>
              <Text className="text-2xl font-bold text-black dark:text-white leading-tight">
                Favorite Apps
              </Text>
              <Text className="font-medium text-rose-500">
                Your Favorites Stay Here
              </Text>
            </View>
          </View>
        </AppBar>

        <View className="h-8" />

        <View className="px-6">
          <View className="flex-row items-center justify-between mb-5">
            <Text className="text-black dark:text-white text-2xl font-medium">
              Your Favorites
            </Text>
            <View className="py-1 px-4 rounded-full bg-indigo-400 dark:bg-indigo-500">
              <Text className="text-white text-base font-bold">
                {appList.length}
              </Text>
            </View>
          </View>

          <AppsList appData={appList} />
        </View>

        <View className="h-28" />
      </ScrollView>
    </ScreenView>
  );
};

export default Favorites;
