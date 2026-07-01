import { Pressable, Text, View } from "react-native";
import { createDayStyle } from "./styles";

export const DaySquare = ({
    size,
    gap,
    day,
    completedCount,
    habitCount,
    empty,
    isToday,
    isSelected,
    isLastInRow,
    onPress,
}) => {
    const style = createDayStyle(
        size,
        gap,
        isLastInRow,
        completedCount,
        habitCount,
        isSelected,
        isToday,
        empty
    );

    if (empty) {
        return <View style={style.emptySquare} />;
    }

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Dia ${day}`}
            onPress={onPress}
            style={({ pressed }) => [style.square, pressed && style.pressed]}
        >
            <Text style={style.dayNumber}>{day}</Text>
            {isToday && <View style={style.todayStripe} />}
        </Pressable>
    );
};
