import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";
import { Dimensions, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const Layout = () => {
  const screenWidth = Dimensions.get("window").width;
  const tabBarWidth = 200;
  const marginHorizontal = (screenWidth - tabBarWidth) / 2;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          alignItems: "center",
          flexDirection: "row",
        },
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "transparent",
          borderColor: "#212121",
          borderWidth: 1,
          marginHorizontal,
          marginBottom: 40,
          height: 60,
          paddingTop: "auto",
          paddingBottom: "auto",
          borderRadius: 48,
          overflow: "hidden",
        },
        tabBarBackground: () => (
          <BlurView
            intensity={20}
            experimentalBlurMethod="dimezisBlurView"
            tint="systemMaterialDark"
            style={{
              flex: 1,
            }}
          />
        ),
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View
              className={`h-[50px] w-[80px] justify-center items-center gap-1.5 p-2 ${focused && "bg-[#212121] border border-[#323232]"} rounded-full`}
            >
              <View className="size-8">
                <Svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#fff"
                >
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </Svg>
              </View>
            </View>
          ),
        }}
      />

      {/* About Tab */}
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ focused }) => (
            <View
              className={`h-[50px] w-[80px] justify-center items-center gap-1.5 p-2 ${focused && "bg-[#212121] border border-[#323232]"} rounded-full`}
            >
              <View className="size-8">
                <Svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#fff"
                >
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </Svg>
              </View>
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
