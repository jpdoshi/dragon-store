import AppBar from "@/components/AppBar";
import AppsList from "@/components/AppsList";
import ScreenView from "@/components/ScreenView";
import config from "@/config";
import { AppMetaData } from "@/types/AppMetaData";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";

const Search = () => {
  const [appList, setAppList] = useState<AppMetaData[]>([]);
  const [filterList, setFilterList] = useState<AppMetaData[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [category, setCategory] = useState<string | null>(null);

  const categoriesList = [
    null,
    "emulators",
    "internet",
    "media",
    "social",
    "streaming",
    "tools",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const fetchedXHR = await axios.get(config.JSON_REPO_URL);

      if (fetchedXHR?.data) {
        const sorted = [...fetchedXHR.data].sort((a, b) =>
          a.title.localeCompare(b.title)
        );

        setAppList(sorted);
        setFilterList(sorted);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  useEffect(() => {
    let filtered = [...appList];

    // Category filter
    if (category) {
      filtered = filtered.filter(
        (app) => app.category?.toLowerCase() === category.toLowerCase()
      );
    }

    // Search filter (debounced)
    if (debouncedQuery.trim().length > 0) {
      filtered = filtered.filter(
        (app) =>
          app.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          app.description.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
    }

    setFilterList(filtered);
  }, [category, debouncedQuery, appList]);

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
                Discover Apps
              </Text>
              <Text className="font-medium text-primary">
                Explore Library of Apps
              </Text>
            </View>
          </View>
        </AppBar>
        <View className="h-5" />

        <View className="px-5">
          {/* Search Bar */}
          <View
            className="flex-row items-center bg-[#212121] border-2 border-neutral-600
                focus:border-rose-500 rounded-2xl h-[50px] px-3 mb-4"
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </Svg>
            </View>

            <TextInput
              onChangeText={setSearchQuery}
              value={searchQuery}
              placeholder="Search Apps"
              placeholderTextColor="#777"
              className="flex-1 text-white ml-1 text-lg font-medium"
            />

            <TouchableOpacity
              onPress={() => {
                setSearchQuery("");
                setDebouncedQuery("");
              }}
            >
              {debouncedQuery.trim() && (
                <View className="size-5">
                  <Svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#fff"
                  >
                    <Path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </Svg>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Categories */}
          <View className="flex-row flex-wrap gap-2 mb-8">
            {categoriesList.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setCategory(item)}
                className={`${category == item ? "bg-rose-500" : "bg-[#212121]"} rounded-lg py-1.5 px-3`}
              >
                <Text className="text-white font-semibold">
                  {item ? item.charAt(0).toUpperCase() + item.slice(1) : "All"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="flex-row items-center justify-between mb-5">
            <Text className="text-white text-2xl font-medium">
              Featured Apps
            </Text>
            <View className="py-1 px-4 rounded-full bg-white">
              <Text className="text-black text-base font-bold">
                {filterList.length}
              </Text>
            </View>
          </View>

          <AppsList appData={filterList} />
        </View>

        <View className="h-24" />
      </ScrollView>
    </ScreenView>
  );
};

export default Search;
