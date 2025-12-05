import AppBar from "@/components/AppBar";
import ScreenView from "@/components/ScreenView";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const Search = () => {
  return (
    <ScreenView>
      <AppBar>
        <View className="flex-1 flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-white leading-snug">
              Search Apps
            </Text>
            <Text className="font-medium text-primary">
              Find Your Apps Here
            </Text>
          </View>
        </View>
      </AppBar>

      {/* Page Content */}
      <ScrollView showsVerticalScrollIndicator={false} className="px-5">
        <View className="h-5" />
        {/* Search Bar */}
        {/* Categories */}
        <View className="h-5" />
      </ScrollView>
    </ScreenView>
  );
};

export default Search;
