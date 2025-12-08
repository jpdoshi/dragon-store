import config from "@/config";
import { AppMetaData } from "@/types/AppMetaData";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const AppContainer = ({ AppData }: { AppData: AppMetaData }) => {
  return (
    <AnimatedTouchable
      entering={FadeInDown.duration(450).springify()}
      onPress={() =>
        router.push({
          pathname: "/appDetails",
          params: { AppData: JSON.stringify(AppData) },
        })
      }
      className="h-[80px] bg-[#181818] mb-3 py-3 px-4 shadow-md rounded-xl"
    >
      <View className="flex-1 flex-row gap-4 items-center">
        <Image
          src={config.ICON_REPO_URL + AppData.icon}
          height={54}
          width={54}
          className="rounded-2xl"
        />

        <View className="flex-1 flex-col">
          <Text className="text-white text-lg font-semibold leading-snug">
            {AppData.title}
          </Text>

          <View className="flex-row items-center gap-2">
            <Text className="text-sm font-medium text-rose-500 leading-tight">
              {AppData.category.charAt(0).toUpperCase() +
                AppData.category.slice(1)}
            </Text>
          </View>

          <Text className="text-stone-400 text-sm">{AppData.author}</Text>
        </View>

        <View className="size-10 p-2.5 rounded-full bg-[rgba(236,0,63,0.1)]">
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
    </AnimatedTouchable>
  );
};

export default AppContainer;
