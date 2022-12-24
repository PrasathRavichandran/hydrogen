import React, { useRef, useState } from "react";
import Animated, { Easing, useAnimatedProps } from "react-native-reanimated";
import { Path } from "react-native-svg";

import { AnimatedRectProps } from "../../types/appTypes";

const AnimatedSvgPath = Animated.createAnimatedComponent(Path);

const TICKPATH =
  "M13 28C21.8676 34.523 25.9917 39.2286 31.4242 50C42.9589 31.0504 51.2654 21.3464 70 6";

interface AnimatedPathProps extends AnimatedRectProps {
  strokeColor: string;
  checked: boolean;
}

export default function AnimatedPath({
  strokeColor,
  checked,
  progress,
}: AnimatedPathProps) {
  const tickRef = useRef();
  const [length, setLength] = useState<number>(0);

  const animatedPathProps = useAnimatedProps(
    () => ({
      strokeDashoffset: Math.max(
        0,
        length -
          length * Easing.bezierFn(0.37, 0, 0.63, 1)(progress.value) -
          0.1
      ),
    }),
    []
  );
  return (
    <AnimatedSvgPath
      d={TICKPATH}
      stroke={strokeColor}
      // @ts-ignore
      ref={tickRef}
      strokeWidth={10}
      // @ts-ignore
      onLayout={() => setLength(tickRef.current?.getTotalLength())}
      strokeDasharray={length}
      strokeOpacity={checked || false ? 1 : 0}
      animatedProps={animatedPathProps}
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  );
}
