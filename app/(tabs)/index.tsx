import AppBar from "@/components/AppBar";
import ScreenView from "@/components/ScreenView";
import TrendingCard from "@/components/TrendingCard";
import config from "@/config";
import { AppMetaData } from "@/types/AppMetaData";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";

const Home = () => {
  const [appList, setAppList] = useState<AppMetaData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedXHR = await axios.get(config.JSON_REPO_URL);
      if (fetchedXHR?.data) setAppList(fetchedXHR?.data);
    };

    fetchData();
  }, []);

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
        <Text className="text-white font-medium text-3xl mb-4">
          Trending Apps
        </Text>
        <FlatList
          data={appList}
          scrollEnabled={false}
          renderItem={({ item }: { item: AppMetaData }) => (
            <TrendingCard AppData={item} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        <View className="h-5" />
      </ScrollView>
    </ScreenView>
  );
};

export default Home;
