import React, { useEffect } from "react";
import { Box, useTheme } from "native-base";
import Svg, { ClipPath, Defs, G, Rect } from "react-native-svg";
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";

import AnimatedRect from "./AnimatedRect";
import AnimatedPath from "./AnimatedPath";

interface CustomCheckboxProps {
  checked: boolean;
}
const MARGIN = 10;
const WIDTH = MARGIN + 64;
const HEIGHT = MARGIN + 64;

const CustomCheckbox = ({ checked }: CustomCheckboxProps) => {
  const progress = useSharedValue(0);
  const {
    colors: { white, blue },
  } = useTheme();

  useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, {
      duration: checked ? 300 : 100,
      easing: Easing.linear,
    });
  }, [checked]);

  return (
    <Box w={6} h={6}>
      <Svg
        viewBox={[-MARGIN, -MARGIN, WIDTH + MARGIN, HEIGHT + MARGIN].join(" ")}
      >
        <AnimatedRect
          width={WIDTH - MARGIN}
          height={HEIGHT - MARGIN}
          progress={progress}
          strokeWidth={7}
        />
        <AnimatedPath
          strokeColor={blue["600"]}
          checked={checked}
          progress={progress}
        />
        <Defs>
          <ClipPath id="clipPath">
            <Rect
              width={WIDTH - MARGIN}
              height={HEIGHT - MARGIN}
              rx={15}
              strokeWidth={7}
              fill={white}
            />
          </ClipPath>
        </Defs>
        <G clipPath="url(#clipPath)">
          <AnimatedPath
            strokeColor={white}
            checked={checked}
            progress={progress}
          />
        </G>
      </Svg>
    </Box>
  );
};

export default CustomCheckbox;
