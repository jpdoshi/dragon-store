import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ScreenView = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView edges={["top", "left", "right"]} className={`flex-1 bg-bg`}>
      <View className="flex-1 w-full max-w-[640px] mx-auto">{children}</View>
    </SafeAreaView>
  );
};

export default ScreenView;
