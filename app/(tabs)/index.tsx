import AppBar from "@/components/AppBar";
import AppsList from "@/components/AppsList";
import ScreenView from "@/components/ScreenView";
import config from "@/config";
import { AppMetaData } from "@/types/AppMetaData";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

const Home = () => {
  const [appList, setAppList] = useState<AppMetaData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedXHR = await axios.get(config.JSON_REPO_URL);

      if (fetchedXHR?.data) {
        const sorted = [...fetchedXHR.data].sort((a, b) =>
          a.title.localeCompare(b.title)
        );

        setAppList(sorted.slice(0, 10));
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

        <View className="px-5">
          <Text className="text-white font-medium text-2xl mb-5">
            Popular Repos
          </Text>

          <AppsList appData={appList} />
        </View>

        <View className="h-24" />
      </ScrollView>
    </ScreenView>
  );
};

export default Home;
