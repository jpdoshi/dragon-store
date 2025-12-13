import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useColorScheme, View } from "react-native";

const AppBar = ({ children }: { children: React.ReactNode }) => {
  const theme = useColorScheme();
  return (
    <View className="flex-row justify-between items-center">
      <LinearGradient
        colors={
          theme == "dark"
            ? ["rgba(18,18,18,1.0)", "rgba(18,18,18,0.8)"]
            : ["rgba(250,250,250,1.0)", "rgba(250,250,250,0.8)"]
        }
        className="flex-1 h-[64px] px-6"
      >
        {children}
      </LinearGradient>
    </View>
  );
};

export default AppBar;
