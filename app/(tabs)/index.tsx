import AppBar from "@/components/AppBar";
import AppsList from "@/components/AppsList";
import ScreenView from "@/components/ScreenView";
import config from "@/config";
import { AppMetaData } from "@/types/AppMetaData";
import axios from "axios";
import * as Application from "expo-application";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  const [appList, setAppList] = useState<AppMetaData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedXHR = await axios.get(config.JSON_REPO_URL);

      if (fetchedXHR?.data) {
        const shuffled = [...fetchedXHR.data].sort(() => Math.random() - 0.5);
        setAppList(shuffled.slice(0, 5));
      }
    };

    fetchData();
  }, []);

  return (
    <ScreenView>
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      >
        <AppBar>
          <View className="flex-1 flex-row items-center justify-between">
            <View>
              <Text className="text-2xl font-bold text-white leading-snug">
                Dragon Store
              </Text>
              <Text className="font-medium text-primary">
                Discover Trending Apps
              </Text>
            </View>
          </View>
        </AppBar>
        <View className="h-8" />

        <View className="mb-16 flex flex-col items-center">
          <Image
            source={require("@/data/assets/logo.png")}
            className="size-[120px] rounded-full shadow-2xl shadow-rose-600"
          />
          <Text className="font-bold text-2xl text-white mt-3">
            {Application.applicationName} v
            {Application.nativeApplicationVersion}
          </Text>
          <Text className="text-neutral-400">by jpdoshi</Text>
          <View className="flex-row gap-3 mt-4">
            <TouchableOpacity className="bg-rose-500 py-3 px-4 rounded-lg">
              <Text className="font-bold text-white">Latest APK</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white py-3 px-4 rounded-lg">
              <Text className="font-bold text-black">Github Repo</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-5">
          <Text className="text-white font-medium text-2xl mb-5">
            Random Apps
          </Text>

          <AppsList appData={appList} />
        </View>

        <View className="h-24" />
      </ScrollView>
    </ScreenView>
  );
};

export default Home;
