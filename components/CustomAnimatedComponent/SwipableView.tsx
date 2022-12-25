import React from "react";
import { Box } from "native-base";
import { Dimensions } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { MakeStyledComponent } from "../../utils/MakeStyledComponent";

interface Props extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
  children: React.ReactNode;
  backView?: React.ReactNode;
  onSwipeLeft?: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.2;

const AnimatedView = MakeStyledComponent(Animated.View);

const SwipableView = ({
  children,
  backView,
  onSwipeLeft,
  simultaneousHandlers,
}: Props) => {
  const translateX = useSharedValue(0);

  const PanGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive(event) {
      translateX.value = Math.max(-128, Math.min(0, event.translationX));
    },
    onEnd(event) {
      if (translateX.value < SWIPE_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        onSwipeLeft && runOnJS(onSwipeLeft)();
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const MakingPanStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <AnimatedView w="full">
      {backView && (
        <Box position={"absolute"} top={0} left={0} right={0} bottom={0}>
          {backView}
        </Box>
      )}
      <PanGestureHandler
        simultaneousHandlers={simultaneousHandlers}
        onGestureEvent={PanGesture}
      >
        <AnimatedView style={MakingPanStyle}>{children}</AnimatedView>
      </PanGestureHandler>
    </AnimatedView>
  );
};

export default SwipableView;
