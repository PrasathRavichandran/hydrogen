import Animated from "react-native-reanimated";
import { PathProps } from "react-native-svg";

export interface AnimatedRectProps extends PathProps {
  progress: Animated.SharedValue<number>;
  width?: number;
  height?: number;
  strokeWidth?: number;
}
