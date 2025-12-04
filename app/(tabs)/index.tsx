import AppBar from "@/components/AppBar";
import ScreenView from "@/components/ScreenView";
import { AppMetaData } from "@/types/AppMetaData";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const trendingApps: AppMetaData[] = [
  {
    title: "Youtube",
    author: "Rvx",
    category: "Media",
    popularity: 10,
    source: "github",
    sourceUrl: "https://github.com/rvx",
  },
];

const Home = () => {
  return (
    <ScreenView>
      <AppBar>
        <View className="flex-1 flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-white leading-snug">
              Discover Apps
            </Text>
            <Text className="font-medium text-primary">
              Explore Library of Mod Apps
            </Text>
          </View>
        </View>
      </AppBar>

      {/* Page Content */}
      <ScrollView showsVerticalScrollIndicator={false} className="px-5">
        <View className="h-5" />
        <Text className="text-white font-semibold text-3xl">Trending Apps</Text>
        <View className="h-5" />
      </ScrollView>
    </ScreenView>
  );
};

export default Home;
