import config from "@/config";
import { AppMetaData } from "@/types/AppMetaData";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

type Props = {
  AppData: AppMetaData;
  screenWidth: number;
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const AppContainer = ({ AppData, screenWidth }: Props) => {
  const marginInline = screenWidth >= 640 ? 8 : 0;

  return (
    <AnimatedTouchable
      entering={FadeInDown.duration(450).springify()}
      onPress={() =>
        router.push({
          pathname: "/appDetails",
          params: { id: AppData.id },
        })
      }
      className="h-[82px] bg-light-surface dark:bg-dark-surface mb-3 p-4 shadow-md shadow-rose-200 dark:shadow-black rounded-2xl"
      style={{ marginInline }}
    >
      <View className="flex-1 flex-row gap-4 items-center">
        <Image
          source={config.ICON_REPO_URL + AppData.icon}
          style={{ height: 56, width: 56, borderRadius: 16 }}
          placeholder={require("@/data/assets/placeholder.gif")}
          contentFit="cover"
          transition={250}
        />

        <View className="flex-1 flex-col">
          <Text className="text-black dark:text-white text-lg font-semibold leading-snug">
            {AppData.title}
          </Text>

          <Text className="text-sm font-medium text-rose-500">
            {AppData.category.charAt(0).toUpperCase() +
              AppData.category.slice(1)}
          </Text>

          <Text className="text-neutral-400 text-sm">{AppData.owner}</Text>
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

export default memo(AppContainer);
