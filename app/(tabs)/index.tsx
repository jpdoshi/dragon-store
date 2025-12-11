import AppBar from "@/components/AppBar";
import AppsList from "@/components/AppsList";
import ScreenView from "@/components/ScreenView";
import config from "@/config";
import { useAppsData } from "@/hooks/useAppsData";
import * as Application from "expo-application";
import { openBrowserAsync } from "expo-web-browser";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Home = () => {
  const { apps, loading } = useAppsData();

  const appList = [...apps].sort(() => Math.random() - 0.5).slice(0, 8);

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
          <Text className="text-white font-medium text-2xl mb-5">
            Random Apps
          </Text>

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
