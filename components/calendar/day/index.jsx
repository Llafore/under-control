import { Pressable } from "react-native";
import { createDayStyle } from "./styles";

export const DaySquare = ({ size, gap, isLastInRow }) => {
    const style = createDayStyle(size, gap, isLastInRow);

    return <Pressable style={style.square} />;
};