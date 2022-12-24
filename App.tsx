import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import Home from "./screens/Home";

import CustomTheme from "./utils/Theme";

export default function App() {
  return (
    <NativeBaseProvider theme={CustomTheme}>
      <StatusBar style={"auto"} />
      <Home />
    </NativeBaseProvider>
  );
}
