import { StatusBar } from "react-native";
import { HabitsPage } from "../screens/habits";

export default function HabitsRoute() {
  return (
    <>
      <StatusBar
          barStyle="light-content"
          backgroundColor="#000"
      />

      <HabitsPage />
    </>
  );
}
