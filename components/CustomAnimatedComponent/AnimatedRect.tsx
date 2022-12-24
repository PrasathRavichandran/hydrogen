import { useColorModeValue, useTheme } from "native-base";
import React from "react";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedProps,
} from "react-native-reanimated";
import { Rect } from "react-native-svg";

import { AnimatedRectProps } from "../../types/appTypes";

const AnimatedSvgRect = Animated.createAnimatedComponent(Rect);

const AnimatedRect = ({
  progress,
  width,
  height,
  strokeWidth,
}: AnimatedRectProps) => {
  const {
    colors: { blue },
  } = useTheme();

  const animatedBoxProps = useAnimatedProps(
    () => ({
      stroke: interpolateColor(
        Easing.bezierFn(0.16, 1, 0.3, 1)(progress.value),
        [0, 1],
        [blue["600"], blue["600"]],
        "RGB"
      ),
      fill: interpolateColor(
        Easing.bezierFn(0.16, 1, 0.3, 1)(progress.value),
        [0, 1],
        ["#00000000", blue["600"]],
        "RGB"
      ),
    }),
    []
  );
  return (
    <AnimatedSvgRect
      width={width}
      height={height}
      rx={15}
      strokeWidth={strokeWidth}
      animatedProps={animatedBoxProps}
    />
  );
};

export default AnimatedRect;
