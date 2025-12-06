import AppBar from "@/components/AppBar";
import AppContainer from "@/components/AppContainer";
import ScreenView from "@/components/ScreenView";
import config from "@/config";
import { AppMetaData } from "@/types/AppMetaData";
import parsePopularity from "@/utils/parsePopularity";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";

const Home = () => {
  const [appList, setAppList] = useState<AppMetaData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedXHR = await axios.get(config.JSON_REPO_URL);

      if (fetchedXHR?.data) {
        const sorted = [...fetchedXHR.data].sort(
          (a, b) =>
            parsePopularity(b.popularity) - parsePopularity(a.popularity)
        );

        setAppList(sorted.slice(0, 10)); // top 10

        console.log(sorted.slice(0, 10));
      }
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
        <View className="h-10" />

        <Text className="text-white font-medium text-3xl mb-5">
          Popular Repos
        </Text>

        <FlatList
          data={appList}
          scrollEnabled={false}
          renderItem={({ item }: { item: AppMetaData }) => (
            <AppContainer AppData={item} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />

        <View className="h-28" />
      </ScrollView>
    </ScreenView>
  );
};

export default Home;
