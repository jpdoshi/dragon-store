import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import React from "react";
import { Dimensions, useColorScheme, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const Layout = () => {
  const screenWidth = Dimensions.get("window").width;
  const tabBarWidth = 270;
  const marginHorizontal = (screenWidth - tabBarWidth) / 2;
  const colorScheme = useColorScheme();

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
          borderColor:
            colorScheme == "dark"
              ? "rgba(60,60,60,0.6)"
              : "rgba(220,220,220,0.6)",
          borderWidth: 1,
          borderTopWidth: 1,
          marginHorizontal,
          marginBottom: 40,
          height: 52,
          paddingTop: "auto",
          paddingBottom: "auto",
          borderRadius: 52,
          overflow: "hidden",
          shadowColor: colorScheme == "dark" ? "#000" : "#a1a1a1",
        },
        tabBarBackground: () => (
          <BlurView
            intensity={60}
            experimentalBlurMethod="dimezisBlurView"
            tint={
              colorScheme == "dark"
                ? "systemMaterialDark"
                : "systemMaterialLight"
            }
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
            <LinearGradient
              colors={
                focused
                  ? ["#ff637e", "#ff2056", "#c70036"]
                  : ["transparent", "transparent"]
              }
              className="h-[42px] w-[58px] flex justify-center items-center"
              style={{ borderRadius: 42 }}
            >
              <View className="size-6">
                <Svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke={colorScheme == "dark" || focused ? "#fff" : "#a1a1a1"}
                >
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </Svg>
              </View>
            </LinearGradient>
          ),
        }}
      />

      {/* Search Tab */}
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <LinearGradient
              colors={
                focused
                  ? ["#ff637e", "#ff2056", "#c70036"]
                  : ["transparent", "transparent"]
              }
              className="h-[42px] w-[58px] flex justify-center items-center"
              style={{ borderRadius: 42 }}
            >
              <View className="size-6">
                <Svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke={colorScheme == "dark" || focused ? "#fff" : "#a1a1a1"}
                >
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </Svg>
              </View>
            </LinearGradient>
          ),
        }}
      />

      {/* Favorites Tab */}
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ focused }) => (
            <LinearGradient
              colors={
                focused
                  ? ["#ff637e", "#ff2056", "#c70036"]
                  : ["transparent", "transparent"]
              }
              className="h-[42px] w-[58px] flex justify-center items-center"
              style={{ borderRadius: 42 }}
            >
              <View className="size-6">
                <Svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke={colorScheme == "dark" || focused ? "#fff" : "#a1a1a1"}
                >
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </Svg>
              </View>
            </LinearGradient>
          ),
        }}
      />

      {/* About Tab */}
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ focused }) => (
            <LinearGradient
              colors={
                focused
                  ? ["#ff637e", "#ff2056", "#c70036"]
                  : ["transparent", "transparent"]
              }
              className="h-[42px] w-[58px] flex justify-center items-center"
              style={{ borderRadius: 42 }}
            >
              <View className="size-6">
                <Svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke={colorScheme == "dark" || focused ? "#fff" : "#a1a1a1"}
                >
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                  />
                </Svg>
              </View>
            </LinearGradient>
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
