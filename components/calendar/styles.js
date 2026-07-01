import { StyleSheet } from "react-native";

const ACCENT = "#FC6C85";

export const createCalendarStyle = (gridPadding) => {
    return StyleSheet.create({
        container: {
            width: "100%",
            paddingHorizontal: gridPadding,
            paddingTop: 18,
            paddingBottom: 10,
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 18,
        },
        monthButton: {
            width: 42,
            height: 42,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#161B22",
            borderWidth: 1,
            borderColor: "#30363D",
        },
        pressed: {
            opacity: 0.62,
        },
        monthButtonText: {
            color: ACCENT,
            fontSize: 22,
            fontWeight: "700",
            lineHeight: 26,
        },
        monthTitleWrap: {
            alignItems: "center",
            justifyContent: "center",
        },
        monthTitle: {
            color: "#E6EDF3",
            fontSize: 24,
            fontWeight: "800",
            textTransform: "capitalize",
        },
        yearTitle: {
            color: "#8B949E",
            fontSize: 13,
            fontWeight: "600",
            marginTop: 2,
        },
        weekRow: {
            flexDirection: "row",
            marginBottom: 8,
        },
        weekDay: {
            color: "#8B949E",
            fontSize: 12,
            fontWeight: "700",
            textAlign: "center",
        },
        grid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 0,
        },
        pickerOverlay: {
            flex: 1,
            justifyContent: "flex-start",
            backgroundColor: "rgba(0, 0, 0, 0.58)",
            paddingHorizontal: gridPadding,
            paddingTop: 18,
        },
        pickerPanel: {
            width: "100%",
            backgroundColor: "#161B22",
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#30363D",
            padding: 16,
        },
        pickerHeader: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
        },
        pickerTitle: {
            color: "#E6EDF3",
            fontSize: 18,
            fontWeight: "800",
        },
        yearInput: {
            width: 74,
            height: 40,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: ACCENT,
            color: "#E6EDF3",
            fontSize: 16,
            fontWeight: "700",
            textAlign: "center",
            backgroundColor: "#0D1117",
        },
        monthGrid: {
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
        },
        monthOption: {
            width: "31%",
            minHeight: 42,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#30363D",
            backgroundColor: "#0D1117",
        },
        monthOptionSelected: {
            borderColor: ACCENT,
            backgroundColor: "rgba(252, 108, 133, 0.16)",
        },
        monthOptionText: {
            color: "#8B949E",
            fontSize: 13,
            fontWeight: "800",
            textTransform: "capitalize",
        },
        monthOptionTextSelected: {
            color: ACCENT,
        },
        pickerActions: {
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 10,
            marginTop: 16,
        },
        pickerSecondaryButton: {
            minWidth: 90,
            height: 40,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#30363D",
        },
        pickerPrimaryButton: {
            minWidth: 90,
            height: 40,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: ACCENT,
        },
        pickerSecondaryText: {
            color: "#E6EDF3",
            fontWeight: "700",
        },
        pickerPrimaryText: {
            color: "#0D1117",
            fontWeight: "800",
        },
    });
};
