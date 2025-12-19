import ScreenView from "@/components/ScreenView";
import config from "@/config";
import axios from "axios";
import * as AuthSession from "expo-auth-session";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

const Login = () => {
  const [loginResult, setLoginResult] = useState<string>("LOAD");

  WebBrowser.maybeCompleteAuthSession();

  useEffect(() => {
    const login = async () => {
      try {
        const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = config;

        const redirectUri = AuthSession.makeRedirectUri();

        const authUrl =
          `https://github.com/login/oauth/authorize` +
          `?client_id=${GITHUB_CLIENT_ID}` +
          `&redirect_uri=${encodeURIComponent(redirectUri)}` +
          `&scope=read:user`;

        const result = await WebBrowser.openAuthSessionAsync(
          authUrl,
          redirectUri
        );

        if (result.type === "success") {
          const code = new URL(result.url).searchParams.get("code");

          const tokenRes = await axios.post(
            "https://github.com/login/oauth/access_token",
            {
              client_id: GITHUB_CLIENT_ID,
              client_secret: GITHUB_CLIENT_SECRET,
              code,
            },
            { headers: { Accept: "application/json" } }
          );

          if (tokenRes?.data) {
            const { access_token: accessToken } = tokenRes?.data;
            await SecureStore.setItemAsync("github_token", accessToken);
            setLoginResult("SUCCESS");
          } else {
            setLoginResult("FAIL");
          }
        } else {
          setLoginResult("FAIL");
        }
      } catch (err) {
        setLoginResult("FAIL");
      }
    };

    login();
    const timeoutId = setTimeout(() => {
      router.replace("/");
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <ScreenView>
      <View className="flex-1 justify-center items-center">
        {loginResult == "LOAD" ? (
          <ActivityIndicator size={"large"} color={"#ff2056"} />
        ) : (
          <Text className="text-lg font-bold text-black dark:text-white">
            {loginResult == "FAIL"
              ? "Login Failed. Please check internet connection and try again later."
              : "Login Success!"}
          </Text>
        )}
      </View>
    </ScreenView>
  );
};

export default Login;
