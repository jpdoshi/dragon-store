import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView className="flex-1">
      <View>
        <Text>Home Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
