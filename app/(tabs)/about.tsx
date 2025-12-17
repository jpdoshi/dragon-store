import AppBar from "@/components/AppBar";
import ScreenView from "@/components/ScreenView";
import * as MailComposer from "expo-mail-composer";
import { openBrowserAsync } from "expo-web-browser";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import Svg, { G, Path } from "react-native-svg";
import Toast from "react-native-toast-message";

const About = () => {
  return (
    <ScreenView>
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      >
        <AppBar>
          <View className="flex-1 flex-row items-center justify-between">
            <View>
              <Text className="text-2xl font-bold text-black dark:text-white leading-tight">
                About Developer
              </Text>
              <Text className="font-medium text-rose-500">
                Know More About Developer
              </Text>
            </View>
          </View>
        </AppBar>

        <View className="h-8" />

        <Animated.View entering={FadeIn.duration(300)} className="px-6">
          <View className="flex-row gap-5 items-center">
            <Image
              src={"https://avatars.githubusercontent.com/u/122164427?v=4"}
              height={100}
              width={100}
              className="rounded-full shadow-2xl shadow-red-400 dark:shadow-red-600"
            />
            <View>
              <Text className="text-2xl font-bold text-black dark:text-white leading-tight">
                The JD Dev
              </Text>
              <Text className="text-rose-500 text-lg font-semibold">
                github.com/jpdoshi
              </Text>
              <Text className="text-neutral-500 dark:text-neutral-400 text-base mt-1">
                Based in India 🇮🇳
              </Text>
            </View>
          </View>

          <View className="h-6" />

          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={async () =>
                await openBrowserAsync("https://thejddev.vercel.app")
              }
              className="h-[45px] flex-row flex-1 rounded-xl bg-rose-500 shadow justify-center items-center gap-1"
            >
              <View className="size-6">
                <Svg viewBox="0 0 24 24" fill="#fff">
                  <Path d="M21.721 12.752a9.711 9.711 0 0 0-.945-5.003 12.754 12.754 0 0 1-4.339 2.708 18.991 18.991 0 0 1-.214 4.772 17.165 17.165 0 0 0 5.498-2.477ZM14.634 15.55a17.324 17.324 0 0 0 .332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 0 0 .332 4.647 17.385 17.385 0 0 0 5.268 0ZM9.772 17.119a18.963 18.963 0 0 0 4.456 0A17.182 17.182 0 0 1 12 21.724a17.18 17.18 0 0 1-2.228-4.605ZM7.777 15.23a18.87 18.87 0 0 1-.214-4.774 12.753 12.753 0 0 1-4.34-2.708 9.711 9.711 0 0 0-.944 5.004 17.165 17.165 0 0 0 5.498 2.477ZM21.356 14.752a9.765 9.765 0 0 1-7.478 6.817 18.64 18.64 0 0 0 1.988-4.718 18.627 18.627 0 0 0 5.49-2.098ZM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 0 0 1.988 4.718 9.765 9.765 0 0 1-7.478-6.816ZM13.878 2.43a9.755 9.755 0 0 1 6.116 3.986 11.267 11.267 0 0 1-3.746 2.504 18.63 18.63 0 0 0-2.37-6.49ZM12 2.276a17.152 17.152 0 0 1 2.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0 1 12 2.276ZM10.122 2.43a18.629 18.629 0 0 0-2.37 6.49 11.266 11.266 0 0 1-3.746-2.504 9.754 9.754 0 0 1 6.116-3.985Z" />
                </Svg>
              </View>

              <Text className="text-base text-white font-semibold">
                Homepage
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () =>
                await openBrowserAsync("https://github.com/jpdoshi")
              }
              className="h-[45px] flex-row flex-1 rounded-xl bg-rose-50 dark:bg-white shadow justify-center items-center gap-1"
            >
              <View className="size-6">
                <Svg viewBox="0 0 128 128">
                  <G fill="#000">
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
                    ></Path>
                    <Path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"></Path>
                  </G>
                </Svg>
              </View>

              <Text className="text-base text-black font-semibold">
                Github Profile
              </Text>
            </TouchableOpacity>
          </View>

          <View className="h-10" />
          <Text className="text-xl font-semibold text-black dark:text-white">
            Request App
          </Text>
          <Text className="text-lg text-neutral-500 dark:text-neutral-400 mt-2">
            You can request to add your favorite app to dragon store via email.
          </Text>
          <TouchableOpacity
            onPress={async () => {
              const isAvailable = await MailComposer.isAvailableAsync();

              if (isAvailable) {
                const result = await MailComposer.composeAsync({
                  recipients: ["thejddev@gmail.com"],
                  subject: `Dragon Store: App Request`,
                });

                if (
                  result.status != MailComposer.MailComposerStatus.UNDETERMINED
                ) {
                  Toast.show({
                    type:
                      result.status == MailComposer.MailComposerStatus.SENT
                        ? "success"
                        : "info",
                    text1: `Email was ${result.status}`,
                    topOffset: 50,
                    swipeable: true,
                  });
                }
              } else {
                Toast.show({
                  type: "error",
                  text1: "No Email app found!",
                  text2: "Please make sure you have email app installed.",
                  topOffset: 50,
                  swipeable: true,
                });
              }
            }}
            className="h-[40px] flex-row flex-1 rounded-xl bg-sky-500 dark:bg-blue-500 shadow justify-center items-center gap-1.5 mt-4"
          >
            <View className="size-6">
              <Svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#fff"
              >
                <Path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </Svg>
            </View>

            <Text className="text-base text-white font-semibold">
              Request App
            </Text>
          </TouchableOpacity>

          <View className="h-8" />
          <Text className="text-xl font-semibold text-black dark:text-white">
            About Developer
          </Text>
          <Text className="text-lg text-neutral-500 dark:text-neutral-400 mt-2">
            👋 Hello there, I am Jainam P. Doshi, Software Engineer from India
            🇮🇳. I love to create innovative apps.
          </Text>

          <View className="h-8" />
          <Text className="text-xl font-semibold text-black dark:text-white">
            Support the Project
          </Text>
          <Text className="text-lg leading-normal mt-2 text-neutral-500 dark:text-neutral-400">
            Fell in love with the project? Contribute to the development by
            supporting the developer.
          </Text>
        </Animated.View>

        <View className="h-36" />
      </ScrollView>
    </ScreenView>
  );
};

export default About;
