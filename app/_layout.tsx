import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        navigationBarColor: "transparent",
        navigationBarTranslucent: true,
        statusBarBackgroundColor: "transparent",
        statusBarTranslucent: true,
        statusBarStyle: "light",
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
