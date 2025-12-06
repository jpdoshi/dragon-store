import { AppMetaData } from "@/types/AppMetaData";
import React from "react";
import { Text, View } from "react-native";

const TrendingCard = ({ AppData }: { AppData: AppMetaData }) => {
  return (
    <View>
      <Text className="text-white">{AppData.title}</Text>
    </View>
  );
};

export default TrendingCard;
