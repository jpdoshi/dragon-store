import { AppMetaData } from "@/types/AppMetaData";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
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
          <View style={{ paddingVertical: 12 }}>
            <TouchableOpacity
              onPress={loadMore}
              className="h-[45px] flex-1 bg-rose-500 justify-center items-center rounded-2xl"
            >
              <Text className="text-white text-base font-semibold">
                LOAD MORE
              </Text>
            </TouchableOpacity>
          </View>
        ) : null
      }
    />
  );
};

export default AppsList;
