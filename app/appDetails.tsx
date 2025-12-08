import AppBar from "@/components/AppBar";
import ScreenView from "@/components/ScreenView";
import config from "@/config";
import convertDate from "@/utils/convertDate";
import formatPopularity from "@/utils/formatPopularity";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const FAVORITES_KEY = "favorite_apps";

const appDetails = () => {
  const { AppData } = useLocalSearchParams();
  const appData = JSON.parse(AppData.toString());

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [githubData, setGithubData] = useState<any>(null);

  // Load favorite state
  useEffect(() => {
    loadFavoriteState();
    loadGithubData();
  }, []);

  const loadFavoriteState = async () => {
    try {
      const saved = await AsyncStorage.getItem(FAVORITES_KEY);
      const favorites = saved ? JSON.parse(saved) : [];

      const exists = favorites.some((item: any) => item.id === appData.id);
      setIsFavorite(exists);
    } catch (err) {
      console.log("Error loading favorites:", err);
    }
  };

  const loadGithubData = async () => {
    try {
      if (appData.repoUrl.includes("github")) {
        setLoadingData(true);
        const fetchedXHR = await axios.get(
          appData.repoUrl.replace("github.com/", "api.github.com/repos/"),
          {
            headers: {
              Authorization: `token ${config.GITHUB_TOKEN}`,
            },
          }
        );

        if (fetchedXHR?.data) setGithubData(fetchedXHR?.data);
        setLoadingData(false);
      }
    } catch (err) {
      console.log("Error loading github info: ", err);
    }
  };

  const toggleFavorite = async () => {
    try {
      const saved = await AsyncStorage.getItem(FAVORITES_KEY);
      let favorites = saved ? JSON.parse(saved) : [];

      if (isFavorite) {
        favorites = favorites.filter((item: any) => item.id !== appData.id);
      } else {
        favorites.push(appData);
      }

      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.log("Error updating favorites:", err);
    }
  };

  return (
    <ScreenView>
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      >
        <AppBar>
          <View className="flex-1 flex-row items-center gap-4">
            <View className="flex-1 flex-row items-center gap-4">
              <TouchableOpacity
                onPress={() => router.back()}
                className="size-6"
              >
                <Svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#ff2056"
                >
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </Svg>
              </TouchableOpacity>

              <Text className="text-xl font-bold text-white leading-snug">
                App Details
              </Text>
            </View>

            {/* Action buttons */}
            <View className="flex-row items-center gap-5">
              {/* Share icon (unchanged) */}
              <TouchableOpacity
                onPress={async () => {
                  try {
                    await Share.share(
                      {
                        message: appData.repoUrl,
                        url: appData.repoUrl,
                        title: "Share or Copy App URL",
                      },
                      { dialogTitle: "Share or Copy App URL" }
                    );
                  } catch (error) {
                    console.log("Error sharing URL:", error);
                  }
                }}
                className="size-5"
              >
                <Svg viewBox="0 0 24 24" fill="#fff">
                  <Path
                    fillRule="evenodd"
                    d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
                    clipRule="evenodd"
                  />
                </Svg>
              </TouchableOpacity>

              <TouchableOpacity onPress={toggleFavorite} className="size-6">
                {isFavorite ? (
                  <Svg viewBox="0 0 24 24" fill="#ff2056" className="size-6">
                    <Path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </Svg>
                ) : (
                  <Svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="#fff"
                  >
                    <Path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </Svg>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </AppBar>

        <View className="h-5" />

        <Animated.View
          entering={FadeIn.delay(200).duration(400)}
          className="px-5"
        >
          <View className="flex-row gap-5 items-center mb-10">
            <Image
              src={config.ICON_REPO_URL + appData.icon}
              height={90}
              width={90}
              className="rounded-3xl"
            />

            <View>
              <Text className="text-white font-bold text-2xl leading-tight">
                {appData.title}
              </Text>
              <Text className="text-neutral-400 text-xl font-medium mb-2">
                {appData.author}
              </Text>
              <View className="bg-[rgba(236,0,63,0.2)] px-1.5 rounded border border-rose-500 self-start">
                <Text className="text-rose-500 text-sm font-medium">
                  {appData.category.charAt(0).toUpperCase() +
                    appData.category.slice(1)}
                </Text>
              </View>
            </View>
          </View>

          {loadingData && (
            <ActivityIndicator
              size={"large"}
              color={"#ff2056"}
              className="mt-24"
            />
          )}

          {githubData && (
            <View className="mb-4">
              <Text className="text-white text-2xl font-medium mb-4">
                GitHub Repo
              </Text>

              <View className="h-[80px] flex-1 bg-[#181818] rounded-xl px-4 flex-row gap-3 items-center justify-around">
                <View className="flex-col justify-center items-center">
                  <Text className="font-bold text-white text-lg">
                    {formatPopularity(githubData.stargazers_count)}
                  </Text>
                  <Text className="font-medium text-sm text-neutral-400">
                    Stargazers
                  </Text>
                </View>
                <View className="h-10 w-[2px] bg-neutral-700" />
                <View className="flex-col justify-center items-center">
                  <Text className="font-bold text-white text-lg">
                    {formatPopularity(githubData.forks_count)}
                  </Text>
                  <Text className="font-medium text-sm text-neutral-400">
                    Repo Forks
                  </Text>
                </View>
                <View className="h-10 w-[2px] bg-neutral-700" />
                <View className="flex-col justify-center items-center">
                  <Text className="font-bold text-white text-lg">
                    {convertDate(githubData.pushed_at)} ago
                  </Text>
                  <Text className="font-medium text-sm text-neutral-400">
                    Last Commit
                  </Text>
                </View>
              </View>
            </View>
          )}

          {!loadingData && (
            <View className="flex-row items-center gap-4">
              {githubData && githubData?.homepage?.startsWith("https://") && (
                <TouchableOpacity
                  onPress={async () =>
                    await openBrowserAsync(githubData.homepage)
                  }
                  className="h-[45px] flex-1 flex-row rounded-xl bg-white justify-center items-center gap-1"
                >
                  <View className="size-5">
                    <Svg
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="#000"
                    >
                      <Path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                      />
                    </Svg>
                  </View>
                  <Text className="text-black text-base font-semibold">
                    App Website
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={async () => {
                  if (appData.repoUrl.includes("github.com")) {
                    await openBrowserAsync(
                      `${appData.repoUrl}/releases/latest`
                    );
                  } else {
                    await openBrowserAsync(appData.repoUrl);
                  }
                }}
                className="h-[45px] flex-1 flex-row rounded-xl bg-rose-500 justify-center items-center gap-1"
              >
                <View className="size-5">
                  <Svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="#fff"
                  >
                    <Path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </Svg>
                </View>
                <Text className="text-white text-base font-semibold">
                  Latest APK
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View className="h-12" />

          {!loadingData && (
            <View>
              <Text className="text-white text-2xl font-medium mb-2">
                About App
              </Text>
              <Text className="text-lg text-neutral-400">
                {appData.description}
              </Text>
            </View>
          )}

          <View className="h-12" />

          {!loadingData && (
            <View>
              <Text className="text-white text-2xl font-medium mb-4">
                App Info
              </Text>
              <View className="flex-col gap-3">
                <View className="h-[50px] flex-row gap-3 justify-between items-center border-b border-neutral-800">
                  <Text className="text-white font-medium text-base">
                    Popularity
                  </Text>
                  <Text className="text-neutral-400 font-medium text-base">
                    {githubData
                      ? formatPopularity(githubData.stargazers_count)
                      : appData.popularity}
                  </Text>
                </View>
                <View className="h-[50px] flex-row gap-3 justify-between items-center border-b border-neutral-800">
                  <Text className="text-white font-medium text-base">
                    Download Source
                  </Text>
                  <Text className="text-neutral-400 font-medium text-base">
                    {new URL(appData.repoUrl).hostname}
                  </Text>
                </View>
                {githubData && (
                  <View className="h-[50px] flex-row gap-3 justify-between items-center border-b border-neutral-800">
                    <Text className="text-white font-medium text-base">
                      Owner Profile
                    </Text>
                    <TouchableOpacity
                      className="flex-row gap-1 items-center"
                      onPress={async () => {
                        if (
                          appData.repoUrl.includes("github.com") &&
                          githubData
                        ) {
                          await openBrowserAsync(githubData.owner.html_url);
                        } else {
                          await openBrowserAsync(
                            `https://${new URL(appData.repoUrl).hostname}`
                          );
                        }
                      }}
                    >
                      <Text className="text-rose-400 font-medium text-base">
                        {`github.com/${githubData.owner.login}`}
                      </Text>
                      <View className="size-5">
                        <Svg
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="#ff637e"
                        >
                          <Path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                          />
                        </Svg>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
                <View className="h-[50px] flex-row gap-3 justify-between items-center border-b border-neutral-800">
                  <Text className="text-white font-medium text-base">
                    {githubData ? "Github Repo" : "Source URL"}
                  </Text>
                  <TouchableOpacity
                    className="flex-row gap-1 items-center"
                    onPress={async () => {
                      if (appData.repoUrl.includes("github.com")) {
                        await openBrowserAsync(appData.repoUrl);
                      } else {
                        await openBrowserAsync(
                          `https://${new URL(appData.repoUrl).hostname}`
                        );
                      }
                    }}
                  >
                    <Text className="text-rose-400 font-medium text-base">
                      {githubData ? githubData.full_name : appData.author}
                    </Text>
                    <View className="size-5">
                      <Svg
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#ff637e"
                      >
                        <Path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                        />
                      </Svg>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Animated.View>

        <View className="h-24" />
      </ScrollView>
    </ScreenView>
  );
};

export default appDetails;
