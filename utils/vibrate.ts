import * as Haptics from "expo-haptics";

export const vibrate = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
};
