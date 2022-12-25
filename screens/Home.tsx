import { Box } from "native-base";
import React, { useCallback, useState } from "react";

import TaskItem from "../components/TaskItem";

const Home = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const onHandleCheckboxAction = useCallback(() => {
    setChecked(!checked);
  }, [checked]);
  return (
    <Box safeArea pl={10} pt={10}>
      <TaskItem
        onPress={onHandleCheckboxAction}
        isDone={checked}
        onRemove={() => {}}
      >
        This is a test todo application
      </TaskItem>
    </Box>
  );
};

export default Home;
