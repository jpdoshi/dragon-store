import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ScreenView = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView className={`flex-1 bg-[#121212]`}>
      <View className="flex-1">{children}</View>
    </SafeAreaView>
  );
};

export default ScreenView;
