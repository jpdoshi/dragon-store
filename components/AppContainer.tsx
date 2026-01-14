import config from "@/config";
import { AppMetaData } from "@/types/AppMetaData";
import { vibrate } from "@/utils/vibrate";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

type Props = {
  AppData: AppMetaData;
};

const AppContainer = ({ AppData }: Props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        vibrate();
        router.push({
          pathname: "/appDetails",
          params: { id: AppData.id },
        });
      }}
      className="h-[80px] py-4 px-2 border-b border-stone-200 dark:border-stone-800"
    >
      <View className="flex-1 flex-row gap-4 items-center">
        <Image
          source={config.ICON_REPO_URL + AppData.icon}
          style={{ height: 50, width: 50, borderRadius: 14 }}
          placeholder={require("@/data/assets/placeholder.gif")}
          contentFit="cover"
          transition={500}
        />

        <View className="flex-1 flex-col">
          <Text className="text-black dark:text-white text-lg font-semibold leading-tight line-clamp-1 text-nowrap">
            {AppData.title}
          </Text>

          <Text className="text-sm font-medium leading-snug text-rose-500">
            {AppData.category.charAt(0).toUpperCase() +
              AppData.category.slice(1)}
          </Text>

          <Text className="text-neutral-500 dark:text-neutral-400 text-sm">
            {AppData.owner}
          </Text>
        </View>

        <View className="size-9 p-2 rounded-full bg-[rgba(236,0,63,0.1)]">
          <Svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#ec003f"
          >
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </Svg>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(AppContainer);
