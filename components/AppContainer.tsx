import { AppMetaData } from "@/types/AppMetaData";
import React from "react";
import { Image, Text, View } from "react-native";

const AppContainer = ({ AppData }: { AppData: AppMetaData }) => {
  return (
    <View className="h-[80px] bg-[#181818] mb-2 py-3 px-4 rounded-xl">
      <View className="flex-1 flex-row gap-4 items-center">
        <Image src={AppData.iconUrl} height={48} width={48} />
        <Text className="text-white text-lg font-bold">{AppData.title}</Text>
      </View>
    </View>
  );
};

export default AppContainer;
