import { BlurView } from "expo-blur";
import { openBrowserAsync } from "expo-web-browser";
import React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

interface DownloadsModalProps {
  visible: boolean;
  onClose: () => void;
  repoUrl: string;
  releaseTag: string;
  assets: any[];
}

const DownloadsModal = ({
  visible,
  onClose,
  releaseTag,
  repoUrl,
  assets,
}: DownloadsModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <BlurView
        intensity={15}
        experimentalBlurMethod="dimezisBlurView"
        tint="dark"
        className="flex-1 justify-center items-center px-6 py-8"
      >
        <View className="min-w-[320px] max-w-[520px] max-h-[85%] bg-white dark:bg-dark-bg rounded-3xl p-6 shadow-2xl shadow-rose-400 dark:shadow-rose-700">
          {/* Header */}
          <Text className="text-2xl font-bold text-black dark:text-white">
            Explore Downloads
          </Text>

          <Text className="text-base text-rose-500 font-medium mb-4">
            {releaseTag}
          </Text>

          {/* Markdown content */}
          <ScrollView showsVerticalScrollIndicator={false} className="mb-5">
            {/* Download buttons */}
            {assets &&
              assets.map((item, index) => (
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      await openBrowserAsync(item.browser_download_url);
                    } catch (error) {
                      console.error(error);
                    }
                    onClose();
                  }}
                  key={index}
                  className="bg-light-surface dark:bg-dark-surface border border-neutral-200 dark:border-neutral-800 flex-row items-center rounded-xl shadow-lg mb-3 py-3 p-4"
                >
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-black dark:text-white">
                      {item?.name}
                    </Text>
                    <Text className="text-black dark:text-white opacity-60">
                      {(item?.size / 1024 / 1024).toFixed(1)} MB
                    </Text>
                  </View>
                  <View className="size-6">
                    <Svg
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#ff2056"
                    >
                      <Path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </Svg>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>

          {/* Footer */}
          <View className="flex-row justify-end">
            <TouchableOpacity
              onPress={onClose}
              className="px-4 py-2 rounded-lg bg-rose-500"
            >
              <Text className="text-white font-semibold">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default DownloadsModal;
