import "@/global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        statusBarStyle: "light",
        headerShown: false,
        animation: "ios_from_right",
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="appDetails" />
    </Stack>
  );
}
