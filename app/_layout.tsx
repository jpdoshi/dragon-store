import "@/global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        statusBarStyle: "light",
        headerShown: false
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
