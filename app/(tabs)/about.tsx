import AppBar from "@/components/AppBar";
import ScreenView from "@/components/ScreenView";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const About = () => {
  return (
    <ScreenView>
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      >
        <AppBar>
          <View className="flex-1 flex-row items-center justify-between">
            <View>
              <Text className="text-2xl font-bold text-white leading-snug">
                Dragon Store
              </Text>
              <Text className="font-medium text-primary">
                Know More About Us
              </Text>
            </View>
          </View>
        </AppBar>

        <View className="h-5" />

        <View className="px-5"></View>

        <View className="h-24" />
      </ScrollView>
    </ScreenView>
  );
};

export default About;
