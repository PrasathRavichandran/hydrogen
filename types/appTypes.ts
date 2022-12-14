import React from "react";
import { PanGestureHandlerProps } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { PathProps } from "react-native-svg";

export interface AnimatedRectProps extends PathProps {
  progress: Animated.SharedValue<number>;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

export interface TaskItemProps
  extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
  children?: React.ReactNode;
  onPress?: () => void;
  isDone: boolean;
  onRemove?: () => void;
}
