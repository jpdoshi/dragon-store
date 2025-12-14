import { BlurView } from "expo-blur";
import React from "react";
import { BackHandler, Modal, Text, TouchableOpacity, View } from "react-native";

interface ModalProps {
  showExitModal: boolean;
  setShowExitModal: (arg: boolean) => void;
}

const ConfirmExitModal = ({ showExitModal, setShowExitModal }: ModalProps) => {
  return (
    <Modal
      visible={showExitModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowExitModal(false)}
    >
      {/* Background */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setShowExitModal(false)}
        className="flex-1"
      >
        <BlurView
          intensity={15}
          experimentalBlurMethod="dimezisBlurView"
          tint="dark"
          className="flex-1 justify-center items-center px-6"
        >
          <TouchableOpacity activeOpacity={1}>
            <View className="w-full bg-white dark:bg-neutral-900 rounded-3xl p-6">
              <Text className="text-2xl font-bold text-black dark:text-white mb-1">
                Exit App
              </Text>

              <Text className="text-lg text-neutral-500 dark:text-neutral-400 mb-6">
                Are you sure you want to exit app?
              </Text>

              <View className="flex-row justify-end gap-2">
                <TouchableOpacity
                  onPress={() => setShowExitModal(false)}
                  className="px-4 py-2 rounded-lg"
                >
                  <Text className="text-neutral-500 dark:text-neutral-400 font-semibold">
                    No, I'll Stay
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => BackHandler.exitApp()}
                  className="px-4 py-2 rounded-lg bg-rose-500"
                >
                  <Text className="text-white font-semibold">Exit App</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </BlurView>
      </TouchableOpacity>
    </Modal>
  );
};

export default ConfirmExitModal;
