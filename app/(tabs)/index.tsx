import AppBar from "@/components/AppBar";
import AppsList from "@/components/AppsList";
import ScreenView from "@/components/ScreenView";
import config from "@/config";
import { useAppsData } from "@/hooks/useAppsData";
import { AppMetaData } from "@/types/AppMetaData";
import * as Application from "expo-application";
import { openBrowserAsync } from "expo-web-browser";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";

const Home = () => {
  const { apps, loading } = useAppsData();

  const [appList, setAppList] = useState<AppMetaData[]>([]);

  const refreshRandomApps = () => {
    if (!apps || apps.length === 0) return;
    const newList = [...apps].sort(() => Math.random() - 0.5).slice(0, 5);

    setAppList(newList);
  };

  useEffect(() => {
    refreshRandomApps();
  }, [apps]);

  return (
    <ScreenView>
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      >
        <AppBar>
          <View className="flex-1 flex-row items-center justify-between">
            <View>
              <Text className="text-2xl font-bold text-white leading-tight">
                Dragon Store
              </Text>
              <Text className="font-medium text-primary">
                Discover Trending Apps
              </Text>
            </View>
          </View>
        </AppBar>
        <View className="h-8" />

        <View className="mb-12 flex flex-col items-center">
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
            <TouchableOpacity
              onPress={async () =>
                await openBrowserAsync(
                  `${config.DRAGON_STORE_REPO_URL}/releases/latest`
                )
              }
              className="bg-rose-500 py-3 px-4 rounded-lg"
            >
              <Text className="font-bold text-white">Check Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () =>
                await openBrowserAsync(config.DRAGON_STORE_REPO_URL)
              }
              className="bg-white py-3 px-4 rounded-lg"
            >
              <Text className="font-bold text-black">Github Repo</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-5">
          <View className="flex-row flex-1 justify-between items-center mb-5">
            <Text className="text-white font-medium text-2xl">Random Apps</Text>
            <TouchableOpacity onPress={refreshRandomApps} className="size-6">
              <Svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#fff"
              >
                <Path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </Svg>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator
              className="mt-24"
              size={"large"}
              color={"#ff2056"}
            />
          ) : (
            <AppsList appData={appList} />
          )}
        </View>

        <View className="h-24" />
      </ScrollView>
    </ScreenView>
  );
};

export default Home;
