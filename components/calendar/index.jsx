import { useWindowDimensions, View } from "react-native";
import { DaySquare } from "./day";
import { createCalendarStyle } from "./styles";
import { defineGridPadding } from "./utils";

export const CalendarGrid = () => {
    const GAP = 6;
    const NUM_COLUMNS = 7;

    const { width } = useWindowDimensions();

    if (!width) return null;

    const gridPadding = defineGridPadding(width);
    const availableWidth = Math.floor(width - gridPadding * 2);
    const itemSize = (availableWidth - GAP * (NUM_COLUMNS * 2)) / NUM_COLUMNS;

    const style = createCalendarStyle(gridPadding, GAP);

    return (
        <View style={style.grid}>
            {Array.from({ length: 31 }).map((_, i) => (
                <DaySquare
                    key={i}
                    size={itemSize}
                    gap={GAP}
                    isLastInRow={(i + 1) % NUM_COLUMNS === 0}
                />
            ))}
        </View>
    );
};