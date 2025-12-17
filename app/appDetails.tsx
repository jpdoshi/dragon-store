import AppBar from "@/components/AppBar";
import ReleaseNotesModal from "@/components/ReleaseNotesModal";
import ScreenView from "@/components/ScreenView";
import config from "@/config";
import { convertTime } from "@/utils/convertTime";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Image } from "expo-image";
import * as MailComposer from "expo-mail-composer";
import { router, useLocalSearchParams } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import Toast from "react-native-toast-message";

const FAVORITES_KEY = "favorite_apps";

const appDetails = () => {
  const { AppData } = useLocalSearchParams();
  const appData = JSON.parse(AppData.toString());

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const colorScheme = useColorScheme();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [repoData, setRepoData] = useState<any>(null);
  const [showReleaseNotes, setShowReleaseNotes] = useState(false);

  useEffect(() => {
    loadFavoriteState();
    loadGithubData();
  }, []);

  const loadGithubData = async () => {
    try {
      if (appData.repoUrl.includes("github.com")) {
        setIsLoading(true);

        const fetchedXHR = await axios.get(
          `${appData.repoUrl}/releases/latest`.replace(
            "github.com",
            "api.github.com/repos"
          )
        );

        if (fetchedXHR?.data) setRepoData(fetchedXHR?.data);
        setIsLoading(false);
      }
    } catch (error) {
      Alert.alert("Github API: Failed to fetch repo data", error?.toString());
      setIsLoading(false);
    }
  };

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
          <View className="flex-1 flex-row items-center justify-between gap-4">
            <TouchableOpacity onPress={() => router.back()} className="size-7">
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

            {/* Action buttons */}
            <View className="flex-row items-center gap-7">
              {/* Share icon */}
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
                className="size-6"
              >
                <Svg
                  viewBox="0 0 24 24"
                  fill={colorScheme == "dark" ? "#fff" : "#000"}
                >
                  <Path
                    fillRule="evenodd"
                    d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
                    clipRule="evenodd"
                  />
                </Svg>
              </TouchableOpacity>

              <TouchableOpacity onPress={toggleFavorite} className="size-7">
                {isFavorite ? (
                  <Svg viewBox="0 0 24 24" fill="#ff2056">
                    <Path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </Svg>
                ) : (
                  <Svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke={colorScheme == "dark" ? "#fff" : "#000"}
                  >
                    <Path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </Svg>
                )}
              </TouchableOpacity>

              {/* Flag icon */}
              <TouchableOpacity
                onPress={async () => {
                  const isAvailable = await MailComposer.isAvailableAsync();

                  if (isAvailable) {
                    const result = await MailComposer.composeAsync({
                      recipients: ["thejddev@gmail.com"],
                      subject: "Dragon Store: App details issue",
                      body: `App ID: ${appData.id}\n\nApp Title: ${appData.title}\n\nIssue: `,
                    });

                    if (
                      result.status !=
                      MailComposer.MailComposerStatus.UNDETERMINED
                    ) {
                      Toast.show({
                        type:
                          result.status == MailComposer.MailComposerStatus.SENT
                            ? "success"
                            : "info",
                        text1: `Email was ${result.status}`,
                        topOffset: 50,
                        swipeable: true,
                      });
                    }
                  } else {
                    Toast.show({
                      type: "error",
                      text1: "No Email app found!",
                      text2: "Please make sure you have email app installed.",
                      topOffset: 50,
                      swipeable: true,
                    });
                  }
                }}
                className="size-6"
              >
                <Svg
                  viewBox="0 0 24 24"
                  fill={colorScheme == "dark" ? "#fff" : "#000"}
                >
                  <Path
                    fillRule="evenodd"
                    d="M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054A8.25 8.25 0 0 0 18 4.524l3.11-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.77l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z"
                    clipRule="evenodd"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
        </AppBar>

        <View className="h-5" />

        <Animated.View
          entering={FadeIn.delay(150).duration(400)}
          className="px-6"
        >
          <View className="flex-row gap-5 items-center mb-10">
            <Image
              source={config.ICON_REPO_URL + appData.icon}
              style={{ height: 90, width: 90, borderRadius: 24 }}
              placeholder={require("@/data/assets/placeholder.gif")}
              contentFit="cover"
              transition={400}
            />

            <View>
              <Text className="text-black dark:text-white font-bold text-2xl leading-tight">
                {appData.title}
              </Text>
              <Text className="text-neutral-500 dark:text-neutral-400 text-lg font-medium mb-1.5">
                {appData.owner}
              </Text>
              <View className="bg-rose-500 py-1 px-2 rounded-lg self-start">
                <Text className="text-white dark:text-black font-bold">
                  {appData.category.charAt(0).toUpperCase() +
                    appData.category.slice(1)}
                </Text>
              </View>
            </View>
          </View>

          <View>
            <Text className="text-black dark:text-white text-xl font-semibold mb-3">
              App Info
            </Text>

            <View className="h-[80px] flex-1 bg-white dark:bg-dark-surface rounded-2xl px-4 flex-row gap-3 items-center justify-around border border-neutral-200 dark:border-neutral-800 shadow-lg shadow-neutral-200 dark:shadow-black">
              <View className="flex-col gap-1.5 justify-center items-center">
                <Image
                  source={require("@/data/assets/android.png")}
                  style={{ height: 28, width: 28 }}
                />
                <Text className="font-medium text-sm text-neutral-500 dark:text-neutral-400">
                  Platform
                </Text>
              </View>
              <View className="h-10 w-[1px] bg-neutral-300 dark:bg-neutral-700" />
              {appData.website?.trim() && (
                <TouchableOpacity
                  onPress={async () => await openBrowserAsync(appData.website)}
                  className="flex-col gap-1.5 justify-center items-center"
                >
                  <View className="size-7">
                    <Svg
                      viewBox="0 0 24 24"
                      fill={colorScheme == "dark" ? "#2b7fff" : "#51a2ff"}
                    >
                      <Path d="M21.721 12.752a9.711 9.711 0 0 0-.945-5.003 12.754 12.754 0 0 1-4.339 2.708 18.991 18.991 0 0 1-.214 4.772 17.165 17.165 0 0 0 5.498-2.477ZM14.634 15.55a17.324 17.324 0 0 0 .332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 0 0 .332 4.647 17.385 17.385 0 0 0 5.268 0ZM9.772 17.119a18.963 18.963 0 0 0 4.456 0A17.182 17.182 0 0 1 12 21.724a17.18 17.18 0 0 1-2.228-4.605ZM7.777 15.23a18.87 18.87 0 0 1-.214-4.774 12.753 12.753 0 0 1-4.34-2.708 9.711 9.711 0 0 0-.944 5.004 17.165 17.165 0 0 0 5.498 2.477ZM21.356 14.752a9.765 9.765 0 0 1-7.478 6.817 18.64 18.64 0 0 0 1.988-4.718 18.627 18.627 0 0 0 5.49-2.098ZM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 0 0 1.988 4.718 9.765 9.765 0 0 1-7.478-6.816ZM13.878 2.43a9.755 9.755 0 0 1 6.116 3.986 11.267 11.267 0 0 1-3.746 2.504 18.63 18.63 0 0 0-2.37-6.49ZM12 2.276a17.152 17.152 0 0 1 2.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0 1 12 2.276ZM10.122 2.43a18.629 18.629 0 0 0-2.37 6.49 11.266 11.266 0 0 1-3.746-2.504 9.754 9.754 0 0 1 6.116-3.985Z" />
                    </Svg>
                  </View>
                  <Text className="font-medium text-sm text-neutral-500 dark:text-neutral-400">
                    Website
                  </Text>
                </TouchableOpacity>
              )}
              {appData.website?.trim() && (
                <View className="h-10 w-[1px] bg-neutral-300 dark:bg-neutral-700" />
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
                className="flex-col gap-1.5 justify-center items-center"
              >
                <View className="size-7">
                  <Svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke={colorScheme == "dark" ? "#fff" : "#000"}
                  >
                    <Path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </Svg>
                </View>
                <Text className="font-medium text-sm text-neutral-500 dark:text-neutral-400">
                  Latest APK
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="h-10" />

          <View>
            <Text className="text-black dark:text-white text-xl font-semibold mb-3">
              About App
            </Text>
            <Text className="text-base text-neutral-500 dark:text-neutral-400">
              {appData.about}
            </Text>
          </View>

          {isLoading && (
            <ActivityIndicator color="#ff2056" size="large" className="mt-20" />
          )}

          {!isLoading && repoData && (
            <View>
              <View className="h-10" />

              <View>
                <Text className="text-black dark:text-white text-xl font-semibold mb-3">
                  Latest Release
                </Text>
                {repoData.tag_name?.trim() && (
                  <View className="h-[50px] flex-row gap-3 justify-between items-center border-b border-neutral-200 dark:border-neutral-800">
                    <Text className="text-black dark:text-white font-semibold text-base">
                      Tag Name / App Version
                    </Text>
                    <Text className="text-amber-500 text-base font-semibold line-clamp-1 text-ellipsis">
                      {repoData?.tag_name}
                    </Text>
                  </View>
                )}
                <View className="h-[50px] flex-row gap-3 justify-between items-center border-b border-neutral-200 dark:border-neutral-800">
                  <Text className="text-black dark:text-white font-semibold text-base">
                    Published At
                  </Text>
                  <Text className="text-black dark:text-white text-base font-medium">
                    {convertTime(repoData?.published_at)}
                  </Text>
                </View>
                <View className="h-[50px] flex-row gap-3 justify-between items-center border-b border-neutral-200 dark:border-neutral-800">
                  <Text className="text-black dark:text-white font-semibold text-base">
                    Release Notes
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowReleaseNotes(true)}
                    className="flex-row gap-1 items-center"
                  >
                    <View className="size-5">
                      <Svg
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="#2b7fff"
                      >
                        <Path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <Path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </Svg>
                    </View>
                    <Text className="text-blue-500 text-base font-semibold">
                      Show Notes
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          <View className="h-10" />

          <View>
            <Text className="text-black dark:text-white text-xl font-semibold mb-3">
              Source Details
            </Text>
            <View className="flex-col gap-3">
              <View className="h-[50px] flex-row gap-3 justify-between items-center border-b border-neutral-200 dark:border-neutral-800">
                <Text className="text-black dark:text-white font-medium text-base">
                  Download Source
                </Text>
                <Text className="text-green-600 font-semibold text-base">
                  {appData.repoUrl.includes("github.com") ||
                  appData.repoUrl.includes("gitlab.com")
                    ? new URL(appData.repoUrl).hostname
                    : "Official Website"}
                </Text>
              </View>
              {appData.repoUrl.includes("github.com") && (
                <View className="h-[50px] flex-row gap-3 justify-between items-center border-b border-neutral-200 dark:border-neutral-800">
                  <Text className="text-black dark:text-white font-medium text-base">
                    Owner Profile
                  </Text>
                  <TouchableOpacity
                    className="flex-row gap-1 items-center"
                    onPress={async () => {
                      if (appData.repoUrl.includes("github.com")) {
                        await openBrowserAsync(
                          `https://github.com/${appData.owner}`
                        );
                      } else {
                        await openBrowserAsync(
                          `https://${new URL(appData.repoUrl).hostname}`
                        );
                      }
                    }}
                  >
                    <Text className="text-rose-400 font-medium text-base line-clamp-1 text-ellipsis">
                      {`github.com/${appData.owner}`}
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
              <View className="h-[50px] flex-row gap-3 justify-between items-center border-b border-neutral-200 dark:border-neutral-800">
                <Text className="text-black dark:text-white font-medium text-base">
                  {appData.repoUrl.includes("github.com") ||
                  appData.repoUrl.includes("gitlab.com")
                    ? "Repo URL"
                    : "Homepage URL"}
                </Text>
                <TouchableOpacity
                  className="flex-row gap-1 items-center"
                  onPress={async () => {
                    if (
                      appData.repoUrl.includes("github.com") ||
                      appData.repoUrl.includes("gitlab.com")
                    ) {
                      await openBrowserAsync(appData.repoUrl);
                    } else {
                      await openBrowserAsync(
                        `https://${new URL(appData.repoUrl).hostname}`
                      );
                    }
                  }}
                >
                  <Text className="text-rose-400 font-medium text-base line-clamp-1 text-ellipsis">
                    {appData.repoUrl.includes("github.com")
                      ? appData.repoUrl.replace("https://github.com/", "")
                      : new URL(appData.repoUrl).hostname}
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
        </Animated.View>

        <View className="h-24" />
      </ScrollView>

      <ReleaseNotesModal
        visible={showReleaseNotes}
        onClose={() => setShowReleaseNotes(false)}
        releaseNotes={repoData?.body}
      />

      <Toast />
    </ScreenView>
  );
};

export default appDetails;
