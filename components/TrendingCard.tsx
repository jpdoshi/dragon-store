import { AppMetaData } from "@/types/AppMetaData";
import React from "react";
import { Text, View } from "react-native";

const TrendingCard = (AppData: AppMetaData) => {
  return (
    <View>
      <Text>{AppData.title}</Text>
    </View>
  );
};

export default TrendingCard;
