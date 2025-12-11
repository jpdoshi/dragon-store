import { AppMetaData } from "@/types/AppMetaData";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import AppContainer from "./AppContainer";

const PAGE_SIZE = 10;

const AppsList = ({ appData }: { appData: AppMetaData[] }) => {
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState<AppMetaData[]>([]);

  useEffect(() => {
    setPage(1);
    setVisible(appData.slice(0, PAGE_SIZE));
  }, [appData]);

  const loadMore = () => {
    const nextPage = page + 1;
    const newSlice = appData.slice(0, nextPage * PAGE_SIZE);
    setVisible(newSlice);
    setPage(nextPage);
  };

  return (
    <FlatList
      data={visible}
      renderItem={({ item }) => <AppContainer AppData={item} />}
      keyExtractor={(item) => item.id.toString()}
      scrollEnabled={false}
      ListEmptyComponent={() => (
        <Text className="text-neutral-400 text-lg font-medium mt-24 text-center">
          No Items to show
        </Text>
      )}
      ListFooterComponent={
        visible.length < appData.length ? (
          <View style={{ paddingVertical: 15 }}>
            <TouchableOpacity
              onPress={loadMore}
              className="h-[45px] w-[150px] mx-auto bg-rose-500 flex-row gap-1 justify-center items-center rounded-full shadow-lg"
            >
              <Text className="text-white font-semibold">Load More</Text>
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
                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                  />
                </Svg>
              </View>
            </TouchableOpacity>
          </View>
        ) : null
      }
    />
  );
};

export default AppsList;
