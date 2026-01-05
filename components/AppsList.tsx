import { AppMetaData } from "@/types/AppMetaData";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import AppContainer from "./AppContainer";

const PAGE_SIZE = 25;

const AppsList = ({ appData }: { appData: AppMetaData[] }) => {
  const [visible, setVisible] = useState<AppMetaData[]>([]);

  useEffect(() => {
    setVisible(appData.slice(0, PAGE_SIZE));
  }, [appData]);

  const loadMore = useCallback(() => {
    const nextSlice = appData.slice(visible.length, visible.length + PAGE_SIZE);

    if (nextSlice.length === 0) return;

    setVisible((prev) => [...prev, ...nextSlice]);
  }, [appData, visible.length]);

  const renderItem = useCallback(
    ({ item }: { item: AppMetaData }) => <AppContainer AppData={item} />,
    []
  );

  const keyExtractor = useCallback((item: AppMetaData) => item.id, []);

  const ListFooter = useMemo(() => {
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
    <FlashList
      data={visible}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      scrollEnabled={false}
      ListFooterComponent={ListFooter}
      ListEmptyComponent={
        <Text className="text-neutral-400 text-lg font-medium mt-24 text-center">
          No Items to show
        </Text>
      }
      contentContainerStyle={{
        paddingBottom: 16,
      }}
    />
  );
};

export default AppsList;
