import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";
import { Dimensions, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const Layout = () => {
  const screenWidth = Dimensions.get("window").width;
  const tabBarWidth = 280;
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
          borderColor: "rgba(60,60,60,0.5)",
          borderWidth: 1,
          borderTopWidth: 1,
          marginHorizontal,
          marginBottom: 40,
          height: 54,
          paddingTop: "auto",
          paddingBottom: "auto",
          borderRadius: 54,
          overflow: "hidden",
        },
        tabBarBackground: () => (
          <BlurView
            intensity={65}
            experimentalBlurMethod="dimezisBlurView"
            tint="dark"
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
              className={`h-[45px] w-[60px] justify-center items-center gap-1.5 p-2 ${focused && "bg-primary"} rounded-full`}
            >
              <View className="size-6">
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

      {/* Search Tab */}
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <View
              className={`h-[45px] w-[60px] justify-center items-center gap-1.5 p-2 ${focused && "bg-primary"} rounded-full`}
            >
              <View className="size-6">
                <Svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#fff"
                >
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </Svg>
              </View>
            </View>
          ),
        }}
      />

      {/* Favorites Tab */}
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ focused }) => (
            <View
              className={`h-[45px] w-[60px] justify-center items-center gap-1.5 p-2 ${focused && "bg-primary"} rounded-full`}
            >
              <View className="size-6">
                <Svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#fff"
                >
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
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
              className={`h-[45px] w-[60px] justify-center items-center gap-1.5 p-2 ${focused && "bg-primary"} rounded-full`}
            >
              <View className="size-6">
                <Svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#fff"
                >
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
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
