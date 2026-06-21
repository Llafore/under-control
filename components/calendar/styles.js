import { StyleSheet } from "react-native";

export const createCalendarStyle = (gridPadding) => {
    return StyleSheet.create({
        grid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            padding: gridPadding,
        },
    });
};