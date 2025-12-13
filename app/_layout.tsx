import "@/global.css";
import * as Network from "expo-network";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import Toast from "react-native-toast-message";

function showNetworkToast() {
  Toast.show({
    type: "error",
    text1: "You're Offline",
    text2: "Please check your internet connection.",
    autoHide: false,
    topOffset: 50,
    swipeable: true,
  });
}

async function checkNetwork() {
  const networkData = await Network.getNetworkStateAsync();
  if (!networkData?.isConnected || !networkData?.isInternetReachable)
    showNetworkToast();
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    const subscription = Network.addNetworkStateListener((state) => {
      if (!state?.isConnected || !state?.isInternetReachable)
        showNetworkToast();
    });

    // check for network on init
    checkNetwork();

    return () => {
      subscription?.remove();
    };
  }, []);

  return (
    <>
      <Stack
        screenOptions={{
          statusBarStyle: colorScheme == "dark" ? "light" : "dark",
          headerShown: false,
          animation: "ios_from_right",
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="appDetails" />
      </Stack>

      <Toast />
    </>
  );
}
