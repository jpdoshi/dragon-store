import AppBar from "@/components/AppBar";
import ScreenView from "@/components/ScreenView";
import React from "react";
import { Text, View } from "react-native";

const Favorites = () => {
  return (
    <ScreenView>
      <AppBar>
        <View className="flex-1 flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-white leading-snug">
              Favorite Apps
            </Text>
            <Text className="font-medium text-primary">
              Your Favorites Stay Here
            </Text>
          </View>
        </View>
      </AppBar>
    </ScreenView>
  );
};

export default Favorites;
