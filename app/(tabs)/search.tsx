import AppBar from "@/components/AppBar";
import AppContainer from "@/components/AppContainer";
import ScreenView from "@/components/ScreenView";
import config from "@/config";
import { AppMetaData } from "@/types/AppMetaData";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";

const Search = () => {
  const [appList, setAppList] = useState<AppMetaData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedXHR = await axios.get(config.JSON_REPO_URL);

      if (fetchedXHR?.data) {
        const sorted = [...fetchedXHR.data].sort((a, b) =>
          a.title.localeCompare(b.title)
        );

        setAppList(sorted);
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
              Search Apps
            </Text>
            <Text className="font-medium text-primary">
              Find Your Apps Here
            </Text>
          </View>
        </View>
      </AppBar>

      {/* Page Content */}
      <ScrollView showsVerticalScrollIndicator={false} className="px-5">
        <View className="h-5" />
        {/* Search Bar */}

        {/* Categories */}

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

export default Search;
