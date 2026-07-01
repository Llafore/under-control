import { StyleSheet } from "react-native";

const EMPTY_COLOR = "#10161D";
const START_COLOR = "#0E2A1D";
const DONE_COLOR = "#39D353";

const hexToRgb = (hex) => {
    const normalized = hex.replace("#", "");

    return {
        r: parseInt(normalized.slice(0, 2), 16),
        g: parseInt(normalized.slice(2, 4), 16),
        b: parseInt(normalized.slice(4, 6), 16),
    };
};

const rgbToHex = ({ r, g, b }) => {
    const toHex = (value) => Math.round(value).toString(16).padStart(2, "0");

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const getBackgroundColor = (completedCount, habitCount) => {
    if (!completedCount || !habitCount) return EMPTY_COLOR;

    const start = hexToRgb(START_COLOR);
    const end = hexToRgb(DONE_COLOR);
    const ratio = completedCount / habitCount;

    return rgbToHex({
        r: start.r + (end.r - start.r) * ratio,
        g: start.g + (end.g - start.g) * ratio,
        b: start.b + (end.b - start.b) * ratio,
    });
};

export const createDayStyle = (
    itemSize,
    gap,
    isLastInRow,
    completedCount,
    habitCount,
    isSelected,
    isToday,
    empty
) => {
    const safeSize = itemSize > 0 ? itemSize : 1;
    const marginRight = isLastInRow ? 0 : gap;
    const marginBottom = gap;
    const isDone = completedCount >= habitCount && habitCount > 0;
    const stripeLength = safeSize * 0.72;
    const stripeThickness = 3;

    return StyleSheet.create({
        square: {
            width: safeSize,
            height: safeSize,
            aspectRatio: 1,
            marginRight,
            marginBottom,
            borderRadius: 4,
            backgroundColor: getBackgroundColor(completedCount, habitCount),
            borderWidth: isSelected ? 2 : 1,
            borderColor: isSelected ? "#FFFFFF" : "#21262D",
            padding: 6,
            overflow: "hidden",
        },
        emptySquare: {
            width: safeSize,
            height: safeSize,
            aspectRatio: 1,
            marginRight,
            marginBottom,
            borderRadius: 4,
            backgroundColor: empty ? "transparent" : EMPTY_COLOR,
        },
        pressed: {
            opacity: 0.72,
        },
        dayNumber: {
            color: isDone ? "#0D1117" : "#E6EDF3",
            fontSize: 11,
            fontWeight: "700",
            lineHeight: 13,
        },
        todayStripe: {
            position: "absolute",
            width: stripeLength,
            height: stripeThickness,
            left: safeSize * 0.75 - stripeLength / 2,
            top: safeSize * 0.75 - stripeThickness / 2,
            borderRadius: stripeThickness,
            backgroundColor: "#FFFFFF",
            transform: [{ rotate: "-45deg" }],
        },
    });
};
