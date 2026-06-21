import { StyleSheet } from "react-native";

const GREEN = "#39D353";

export const createChecklistStyle = () => {
    return StyleSheet.create({
        container: {
            padding: 20,
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
        },
        title: {
            fontSize: 18,
            fontWeight: "700",
            color: "#eee",
        },
        counter: {
            fontSize: 14,
            color: GREEN,
            fontWeight: "600",
        },
        progressBarTrack: {
            height: 6,
            borderRadius: 3,
            backgroundColor: "#2a2a2a",
            marginBottom: 20,
            overflow: "hidden",
        },
        progressBarFill: {
            height: "100%",
            borderRadius: 3,
            backgroundColor: GREEN,
        },
        list: {
            borderRadius: 10,
            overflow: "hidden",
        },
    });
};