import React from "react";
import { View } from "react-native";

const AppBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="h-[60px] w-full px-5 flex-row justify-between items-center">
      {children}
    </View>
  );
};

export default AppBar;
