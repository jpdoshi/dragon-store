import AppBar from "@/components/AppBar";
import ScreenView from "@/components/ScreenView";
import React from "react";
import { Text, View } from "react-native";

const About = () => {
  return (
    <ScreenView>
      <AppBar>
        <View className="flex-1 flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-white leading-snug">
              Dragon Store
            </Text>
            <Text className="font-medium text-primary">Know More About Us</Text>
          </View>
        </View>
      </AppBar>
    </ScreenView>
  );
};

export default About;
