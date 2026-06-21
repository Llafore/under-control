import { StatusBar } from "react-native";
import { HomePage } from "../screens/home";

export default function Index() {
  return (
    <>
      <StatusBar
          barStyle="light-content"
          backgroundColor="#000"
      />

      <HomePage />
    </>
  );
}
