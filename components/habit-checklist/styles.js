import { StyleSheet } from "react-native";

const GREEN = "#39D353";

export const createChecklistStyle = () => {
    return StyleSheet.create({
        container: {
            width: "100%",
            paddingHorizontal: 20,
            paddingTop: 12,
            paddingBottom: 28,
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 12,
        },
        title: {
            fontSize: 22,
            fontWeight: "800",
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
            backgroundColor: "#161B22",
            borderRadius: 8,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "#30363D",
        },
        emptyText: {
            color: "#8B949E",
            fontSize: 14,
            paddingVertical: 18,
            paddingHorizontal: 14,
        },
    });
};
