import { Box, HStack, Text, useTheme } from "native-base";
import React, { useEffect } from "react";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { TaskItemProps } from "../../types/appTypes";

const AnimatedHStack = Animated.createAnimatedComponent(HStack);
const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedBox = Animated.createAnimatedComponent(Box);

const AnimatedLabel = ({ children, isDone }: TaskItemProps) => {
  const horizontalOffset = useSharedValue(0);
  const textColorOffset = useSharedValue(0);
  const strikeThroughWidth = useSharedValue(0);

  const {
    colors: { muted },
  } = useTheme();

  const horizontalOffsetStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: horizontalOffset.value }],
    }),
    []
  );

  const textColorOffsetStyle = useAnimatedStyle(
    () => ({
      color: interpolateColor(
        textColorOffset.value,
        [0, 1],
        [muted["800"], muted["400"]],
        "RGB"
      ),
    }),
    [strikeThroughWidth, textColorOffset]
  );

  const strikeThroughOffsetStyle = useAnimatedStyle(
    () => ({
      width: `${strikeThroughWidth.value * 100}%`,
      borderBottomColor: interpolateColor(
        strikeThroughWidth.value,
        [0, 1],
        [muted["800"], muted["400"]],
        "RGB"
      ),
    }),
    [strikeThroughWidth]
  );

  useEffect(() => {
    const easing = Easing.out(Easing.quad);
    if (isDone) {
      horizontalOffset.value = withSequence(
        withTiming(4, { duration: 200, easing }),
        withTiming(0, { duration: 200, easing })
      );
      textColorOffset.value = withDelay(
        600,
        withTiming(1, { duration: 300, easing })
      );
      strikeThroughWidth.value = withTiming(1, { duration: 600, easing });
    } else {
      strikeThroughWidth.value = withTiming(0, { duration: 300, easing });
      textColorOffset.value = withTiming(0, { duration: 300, easing });
    }
  }, [isDone, strikeThroughWidth]);

  return (
    <AnimatedHStack
      alignItems={"center"}
      style={[horizontalOffsetStyle]}
      ml={1}
    >
      <AnimatedText
        isTruncated
        noOfLines={1}
        fontSize={19}
        px={1}
        style={[textColorOffsetStyle]}
      >
        {children}
      </AnimatedText>
      <AnimatedBox
        position={"absolute"}
        borderBottomWidth={1}
        h={1}
        style={[strikeThroughOffsetStyle]}
      />
    </AnimatedHStack>
  );
};

export default AnimatedLabel;
