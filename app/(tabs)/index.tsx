import AppBar from "@/components/AppBar";
import ScreenView from "@/components/ScreenView";
import { AppMetaData } from "@/types/AppMetaData";
import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";

const appList: AppMetaData[] = [
  {
    id: "1",
    title: "Youtube",
    author: "Rvx",
    category: "Media",
    popularity: "10",
    description: "lorem ipsum dolore sit amet un",
    iconUrl: "https://github.com/rvx",
    authorUrl: "https://github.com/rvx",
    repoUrl: "https://youtube.com",
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
        <Text className="text-white font-medium text-xl">Trending Apps</Text>
        <FlatList
          data={appList}
          scrollEnabled={false}
          renderItem={({ item }: { item: AppMetaData }) => (
            <Text className="text-white text-2xl font-bold">{item?.title}</Text>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        <View className="h-5" />
      </ScrollView>
    </ScreenView>
  );
};

export default Home;
