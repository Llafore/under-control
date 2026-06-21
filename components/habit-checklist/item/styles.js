import { StyleSheet } from "react-native";

const CHECKBOX_SIZE = 22;
const INNER_SIZE = 12;

// mesma paleta de verde do CalendarGrid
const GREEN = "#39D353";
const GREEN_DIM = "#1a6b2a";

export const createItemStyle = (done) => {
    return StyleSheet.create({
        row: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 14,
            paddingHorizontal: 4,
            borderBottomWidth: 1,
            borderBottomColor: "#2a2a2a",
            opacity: done ? 0.6 : 1,
        },
        pressed: {
            opacity: 0.4,
        },
        checkbox: {
            width: CHECKBOX_SIZE,
            height: CHECKBOX_SIZE,
            borderRadius: 6,
            borderWidth: 2,
            borderColor: done ? GREEN : "#555",
            backgroundColor: done ? GREEN_DIM : "transparent",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 14,
        },
        checkboxInner: {
            width: INNER_SIZE,
            height: INNER_SIZE,
            borderRadius: 3,
            backgroundColor: GREEN,
        },
        label: {
            fontSize: 15,
            color: done ? "#aaa" : "#eee",
            textDecorationLine: done ? "line-through" : "none",
            flexShrink: 1,
        },
    });
};