import { Box, Text } from "native-base";
import React, { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";

import CustomCheckbox from "../components/CustomCheckbox";

const Home = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const onHandleCheckboxAction = useCallback(() => {
    setChecked(!checked);
  }, [checked]);
  return (
    <Box safeArea pl={10} pt={10}>
      <TouchableOpacity onPress={onHandleCheckboxAction}>
        <CustomCheckbox checked={checked} />
      </TouchableOpacity>
    </Box>
  );
};

export default Home;
