import { Box, HStack, Icon, Pressable } from "native-base";
import React from "react";
import Feather from "@expo/vector-icons/Feather";

import CustomCheckbox from "./CustomCheckbox";

import { TaskItemProps } from "../types/appTypes";

import AnimatedLabel from "./CustomAnimatedComponent/AnimatedLabel";
import SwipableView from "./CustomAnimatedComponent/SwipableView";

const TaskItem = ({
  children,
  onPress,
  isDone,
  onRemove,
  simultaneousHandlers,
}: TaskItemProps) => {
  return (
    <SwipableView
      onSwipeLeft={onRemove}
      simultaneousHandlers={simultaneousHandlers}
      backView={
        <Box
          pr={4}
          w="full"
          h="full"
          bg={"red.500"}
          alignItems="flex-end"
          justifyContent={"center"}
        >
          <Icon color={"white"} as={<Feather name={"trash-2"} />} size={"sm"} />
        </Box>
      }
    >
      <Pressable onPress={onPress}>
        <HStack alignItems={"center"} bg={"white"}>
          <CustomCheckbox checked={isDone} />
          <AnimatedLabel isDone={isDone}>{children}</AnimatedLabel>
        </HStack>
      </Pressable>
    </SwipableView>
  );
};

export default TaskItem;
