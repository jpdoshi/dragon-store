import { BlurView } from "expo-blur";
import React from "react";
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Markdown from "react-native-markdown-display";

interface ReleaseNotesModalProps {
  visible: boolean;
  onClose: () => void;
  releaseNotes?: string;
}

const ReleaseNotesModal = ({
  visible,
  onClose,
  releaseNotes,
}: ReleaseNotesModalProps) => {
  const colorScheme = useColorScheme();

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
        className="flex-1 justify-center items-center px-6"
      >
        <View className="min-w-[320px] max-h-[95%] bg-white dark:bg-dark-bg rounded-3xl p-6 shadow-2xl shadow-rose-400 dark:shadow-rose-700">
          {/* Header */}
          <Text className="text-2xl font-bold text-black dark:text-white">
            Release Notes
          </Text>

          <Text className="text-base text-rose-500 font-medium mb-4">
            What's new in this release
          </Text>

          {/* Markdown content */}
          <ScrollView showsVerticalScrollIndicator={false} className="mb-5">
            {releaseNotes?.trim() ? (
              <Markdown
                style={{
                  body: {
                    color: colorScheme == "dark" ? "#ddd" : "#424242",
                    fontSize: 15,
                  },
                  heading1: {
                    color: colorScheme == "dark" ? "#fff" : "#000",
                    fontSize: 22,
                    marginBottom: 8,
                  },
                  heading2: {
                    color: colorScheme == "dark" ? "#fff" : "#000",
                    fontSize: 18,
                    marginBottom: 6,
                  },
                  heading3: {
                    color: colorScheme == "dark" ? "#fff" : "#000",
                    fontSize: 18,
                    marginBottom: 6,
                  },
                  bullet_list: {
                    marginVertical: 6,
                  },
                  list_item: {
                    flexDirection: "row",
                    marginBottom: 4,
                  },
                  link: {
                    color: "#2b7fff",
                  },
                  code_inline: {
                    color: "#666",
                    backgroundColor: colorScheme == "dark" ? "#212121" : "#eee",
                    paddingHorizontal: 6,
                    borderRadius: 6,
                    fontSize: 13,
                  },
                  fence: {
                    color: "#666",
                    backgroundColor: colorScheme == "dark" ? "#212121" : "#eee",
                    padding: 10,
                    borderRadius: 10,
                  },
                }}
              >
                {releaseNotes}
              </Markdown>
            ) : (
              <Text className="text-neutral-400 italic">
                No release notes available.
              </Text>
            )}
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

export default ReleaseNotesModal;
