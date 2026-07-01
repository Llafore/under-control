import { useState } from "react";
import { Modal, Pressable, Text, TextInput, useWindowDimensions, View } from "react-native";
import { DaySquare } from "./day";
import { createCalendarStyle } from "./styles";
import {
    addMonths,
    buildMonthCells,
    defineGridPadding,
    getMonthLabel,
    getMonthNames,
    getTodayKey,
    getWeekDays,
} from "./utils";

export const CalendarGrid = ({
    monthDate,
    selectedDateKey,
    monthSummary,
    onChangeMonth,
    onSelectDate,
}) => {
    const GAP = 8;
    const NUM_COLUMNS = 7;

    const { width } = useWindowDimensions();
    const currentYear = monthDate.getFullYear();
    const monthNames = getMonthNames();
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [draftMonth, setDraftMonth] = useState(monthDate.getMonth());
    const [draftYear, setDraftYear] = useState(String(currentYear));

    if (!width) return null;

    const gridPadding = defineGridPadding(width);
    const availableWidth = Math.floor(width - gridPadding * 2);
    const itemSize = Math.floor((availableWidth - GAP * (NUM_COLUMNS - 1)) / NUM_COLUMNS);

    const style = createCalendarStyle(gridPadding);
    const monthCells = buildMonthCells(monthDate);
    const weekDays = getWeekDays();
    const todayKey = getTodayKey();

    const openPicker = () => {
        setDraftMonth(monthDate.getMonth());
        setDraftYear(String(monthDate.getFullYear()));
        setIsPickerOpen(true);
    };

    const applyPicker = () => {
        const parsedYear = Number(draftYear);
        const nextYear = /^\d{4}$/.test(draftYear) && Number.isFinite(parsedYear)
            ? parsedYear
            : currentYear;

        onChangeMonth(new Date(nextYear, draftMonth, 1));
        setIsPickerOpen(false);
    };

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Mes anterior"
                    onPress={() => onChangeMonth(addMonths(monthDate, -1))}
                    style={({ pressed }) => [style.monthButton, pressed && style.pressed]}
                >
                    <Text style={style.monthButtonText}>{"<"}</Text>
                </Pressable>

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Escolher mes e ano"
                    onPress={openPicker}
                    style={({ pressed }) => [style.monthTitleWrap, pressed && style.pressed]}
                >
                    <Text style={style.monthTitle}>{getMonthLabel(monthDate)}</Text>
                    <Text style={style.yearTitle}>{currentYear}</Text>
                </Pressable>

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Proximo mes"
                    onPress={() => onChangeMonth(addMonths(monthDate, 1))}
                    style={({ pressed }) => [style.monthButton, pressed && style.pressed]}
                >
                    <Text style={style.monthButtonText}>{">"}</Text>
                </Pressable>
            </View>

            <View style={style.weekRow}>
                {weekDays.map((weekDay, index) => (
                    <Text
                        key={`${weekDay}-${index}`}
                        style={[
                            style.weekDay,
                            { width: itemSize, marginRight: index % NUM_COLUMNS === NUM_COLUMNS - 1 ? 0 : GAP },
                        ]}
                    >
                        {weekDay}
                    </Text>
                ))}
            </View>

            <View style={style.grid}>
                {monthCells.map((cell, index) => (
                    <DaySquare
                        key={cell.key}
                        size={itemSize}
                        gap={GAP}
                        day={cell.day}
                        completedCount={monthSummary[cell.dateKey]?.completedCount || 0}
                        habitCount={monthSummary[cell.dateKey]?.habitCount || 0}
                        empty={cell.empty}
                        isToday={cell.dateKey === todayKey}
                        isSelected={cell.dateKey === selectedDateKey}
                        isLastInRow={index % NUM_COLUMNS === NUM_COLUMNS - 1}
                        onPress={() => onSelectDate(cell.date)}
                    />
                ))}
            </View>

            <Modal visible={isPickerOpen} transparent animationType="fade">
                <Pressable style={style.pickerOverlay} onPress={() => setIsPickerOpen(false)}>
                    <Pressable style={style.pickerPanel}>
                        <View style={style.pickerHeader}>
                            <Text style={style.pickerTitle}>Escolher mês</Text>
                            <TextInput
                                value={draftYear}
                                onChangeText={setDraftYear}
                                keyboardType="number-pad"
                                maxLength={4}
                                style={style.yearInput}
                                selectTextOnFocus
                            />
                        </View>

                        <View style={style.monthGrid}>
                            {monthNames.map((monthName, index) => {
                                const selected = index === draftMonth;

                                return (
                                    <Pressable
                                        key={monthName}
                                        accessibilityRole="button"
                                        accessibilityState={{ selected }}
                                        onPress={() => setDraftMonth(index)}
                                        style={[
                                            style.monthOption,
                                            selected && style.monthOptionSelected,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                style.monthOptionText,
                                                selected && style.monthOptionTextSelected,
                                            ]}
                                        >
                                            {monthName.slice(0, 3)}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                        </View>

                        <View style={style.pickerActions}>
                            <Pressable
                                accessibilityRole="button"
                                onPress={() => setIsPickerOpen(false)}
                                style={style.pickerSecondaryButton}
                            >
                                <Text style={style.pickerSecondaryText}>Cancelar</Text>
                            </Pressable>
                            <Pressable
                                accessibilityRole="button"
                                onPress={applyPicker}
                                style={style.pickerPrimaryButton}
                            >
                                <Text style={style.pickerPrimaryText}>Aplicar</Text>
                            </Pressable>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
};
