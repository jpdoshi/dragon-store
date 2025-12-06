import { AppMetaData } from "@/types/AppMetaData";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const AppContainer = ({ AppData }: { AppData: AppMetaData }) => {
  return (
    <TouchableOpacity className="h-[80px] bg-[#181818] mb-3 py-3 px-4 shadow-md rounded-xl">
      <View className="flex-1 flex-row gap-4 items-center">
        <Image
          src={AppData.iconUrl}
          height={50}
          width={50}
          className="rounded-xl"
        />
        <View className="flex-1 flex-col">
          <Text className="text-white text-lg font-semibold">
            {AppData.title}
          </Text>
          <Text className="text-gray-400 text-sm">{AppData.author}</Text>
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
    </TouchableOpacity>
  );
};

export default AppContainer;
