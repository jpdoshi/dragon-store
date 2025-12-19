import { AppMetaData } from "@/types/AppMetaData";
import { LegendList } from "@legendapp/list";
import React, { useEffect, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import AppContainer from "./AppContainer";

const PAGE_SIZE = 10;

const AppsList = ({ appData }: { appData: AppMetaData[] }) => {
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState<AppMetaData[]>([]);
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    setPage(1);
    setVisible(appData.slice(0, PAGE_SIZE));
  }, [appData]);

  const loadMore = React.useCallback(() => {
    const nextSlice = appData.slice(visible.length, visible.length + PAGE_SIZE);
    setVisible((prev) => [...prev, ...nextSlice]);
    setPage((prev) => prev + 1);
  }, [appData, visible.length]);

  const renderItem = React.useCallback(
    ({ item }: { item: AppMetaData }) => (
      <AppContainer screenWidth={screenWidth} AppData={item} />
    ),
    [screenWidth]
  );

  const keyExtractor = React.useCallback((item: AppMetaData) => item.id, []);
  const numColumns = screenWidth >= 640 ? 2 : 1;

  const ListFooter = React.useMemo(() => {
    if (visible.length >= appData.length) return null;

    return (
      <View style={{ paddingVertical: 15 }}>
        <TouchableOpacity
          onPress={loadMore}
          className="h-[45px] w-[150px] mx-auto bg-rose-500 flex-row gap-1 justify-center items-center rounded-full shadow-lg"
        >
          <Text className="text-white font-semibold">Load More</Text>
          <View className="size-5">
            <Svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#fff">
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              />
            </Svg>
          </View>
        </TouchableOpacity>
      </View>
    );
  }, [visible.length, appData.length, loadMore]);

  return (
    <LegendList
      data={visible}
      renderItem={renderItem}
      estimatedItemSize={82}
      keyExtractor={keyExtractor}
      recycleItems={true}
      scrollEnabled={false}
      numColumns={numColumns}
      ListEmptyComponent={() => (
        <Text className="text-neutral-400 text-lg font-medium mt-24 text-center">
          No Items to show
        </Text>
      )}
      ListFooterComponent={ListFooter}
    />
  );
};

export default AppsList;
