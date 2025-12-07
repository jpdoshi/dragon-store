import AppBar from "@/components/AppBar";
import ScreenView from "@/components/ScreenView";
import config from "@/config";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const appDetails = () => {
  const { AppData } = useLocalSearchParams();
  const appData = JSON.parse(AppData.toString());

  return (
    <ScreenView>
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      >
        <AppBar>
          <View className="flex-1 flex-row items-center gap-4">
            <TouchableOpacity onPress={() => router.back()} className="size-6">
              <Svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#ff2056"
              >
                <Path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </Svg>
            </TouchableOpacity>
            <Text className="text-xl font-bold text-white leading-snug">
              App Details
            </Text>
          </View>
        </AppBar>
        <View className="h-5" />

        <View className="px-5">
          <View className="flex-row gap-5 items-center mb-8">
            <Image
              src={config.ICON_REPO_URL + appData.iconUrl}
              height={90}
              width={90}
              className="rounded-3xl"
            />

            <View>
              <Text className="text-white font-bold text-2xl leading-tight">
                {appData.title}
              </Text>
              <Text className="text-stone-400 text-xl font-medium mb-2">
                {appData.author}
              </Text>
              <View className="bg-[rgba(236,0,63,0.2)] px-1.5 rounded border border-rose-500 self-start">
                <Text className="text-rose-500 text-sm font-medium">
                  {appData.category.charAt(0).toUpperCase() +
                    appData.category.slice(1)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="h-24" />
      </ScrollView>
    </ScreenView>
  );
};

export default appDetails;
