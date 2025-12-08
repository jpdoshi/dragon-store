import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View } from "react-native";

const AppBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="flex-row justify-between items-center">
      <LinearGradient
        colors={["rgba(18,18,18,1.0)", "rgba(18,18,18,0.75)"]}
        className="flex-1 h-[64px] px-5"
      >
        {children}
      </LinearGradient>
    </View>
  );
};

export default AppBar;
