import { HStack, Pressable } from "native-base";
import React from "react";

import CustomCheckbox from "./CustomCheckbox";

import { TaskItemProps } from "../types/appTypes";
import AnimatedLabel from "./CustomAnimatedComponent/AnimatedLabel";

const TaskItem = ({ children, onPress, isDone }: TaskItemProps) => {
  return (
    <Pressable onPress={onPress}>
      <HStack alignItems={"center"}>
        <CustomCheckbox checked={isDone} />
        <AnimatedLabel isDone={isDone}>{children}</AnimatedLabel>
      </HStack>
    </Pressable>
  );
};

export default TaskItem;
