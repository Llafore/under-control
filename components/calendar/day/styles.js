import { StyleSheet } from "react-native";

export const createDayStyle = (itemSize, gap, isLastInRow) => {
    return StyleSheet.create({
        square: {
            width: itemSize > 0 ? itemSize : 1,
            height: itemSize > 0 ? itemSize : 1,
            aspectRatio: 1,
            margin: gap,
            borderRadius: 4,
            backgroundColor: '#39D353',
        },
    });
};