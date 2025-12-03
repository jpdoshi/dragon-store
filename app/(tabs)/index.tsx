import AppBar from "@/components/AppBar";
import ScreenView from "@/components/ScreenView";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const Home = () => {
  return (
    <ScreenView>
      <AppBar>
        <View className="flex-1 flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-white leading-snug">
              Discover Apps
            </Text>
            <Text className="font-medium text-primary">
              Explore library of mod apps
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/settings')} className="size-8">
            <Svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#fff"
            >
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
              />
            </Svg>
          </TouchableOpacity>
        </View>
      </AppBar>
    </ScreenView>
  );
};

export default Home;
