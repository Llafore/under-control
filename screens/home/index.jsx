import { useCallback, useState } from "react"
import { Pressable, ScrollView, Text, View } from "react-native"
import { useFocusEffect, useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { CalendarGrid } from "../../components/calendar"
import { buildMonthCells, getDateKey } from "../../components/calendar/utils"
import { HabitChecklist } from "../../components/habit-checklist"
import {
    initHabitsDatabase,
    listEntriesForDate,
    listHabitsForDate,
    loadMonthSummary,
    setHabitEntry,
} from "../../data/habitsRepository"
import {
    getCalendarSelectedDate,
    setCalendarSelectedDate,
} from "../../data/calendarSession"
import { HomeStyle } from "./styles"

const getMonthStart = (date) => new Date(date.getFullYear(), date.getMonth(), 1);

export const HomePage = () => {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState(getCalendarSelectedDate);
    const [monthDate, setMonthDate] = useState(() => getMonthStart(selectedDate));
    const [habits, setHabits] = useState([]);
    const [checked, setChecked] = useState({});
    const [monthSummary, setMonthSummary] = useState({});

    const selectedDateKey = getDateKey(selectedDate);

    const loadScreenData = useCallback(async () => {
        await initHabitsDatabase();

        const monthDateKeys = buildMonthCells(monthDate)
            .filter((cell) => !cell.empty)
            .map((cell) => cell.dateKey);
        const [visibleHabits, entries, summary] = await Promise.all([
            listHabitsForDate(selectedDateKey),
            listEntriesForDate(selectedDateKey),
            loadMonthSummary(monthDateKeys),
        ]);

        setHabits(visibleHabits.map((habit) => ({
            ...habit,
            label: habit.title,
        })));
        setChecked(entries.reduce((acc, entry) => ({
            ...acc,
            [entry.habit_id]: !!entry.completed,
        }), {}));
        setMonthSummary(summary);
    }, [monthDate, selectedDateKey]);

    useFocusEffect(
        useCallback(() => {
            loadScreenData();
        }, [loadScreenData])
    );

    const handleChangeMonth = (nextMonthDate) => {
        const nextSelectedDate = new Date(
            nextMonthDate.getFullYear(),
            nextMonthDate.getMonth(),
            1
        );

        setMonthDate(nextMonthDate);
        setSelectedDate(nextSelectedDate);
        setCalendarSelectedDate(nextSelectedDate);
    };

    const handleSelectDate = (date) => {
        setSelectedDate(date);
        setCalendarSelectedDate(date);
    };

    const handleToggleHabit = async (habitId) => {
        const nextValue = !checked[habitId];

        setChecked((currentChecked) => ({
            ...currentChecked,
            [habitId]: nextValue,
        }));

        await setHabitEntry(habitId, selectedDateKey, nextValue);
        await loadScreenData();
    };

    return(
        <SafeAreaView style={HomeStyle.container}>
            <ScrollView
                contentContainerStyle={HomeStyle.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={HomeStyle.topBar}>
                    <Text style={HomeStyle.appTitle}>Under Control</Text>
                    <Pressable
                        accessibilityRole="button"
                        onPress={() => router.push("/habits")}
                        style={({ pressed }) => [HomeStyle.manageButton, pressed && HomeStyle.pressed]}
                    >
                        <Text style={HomeStyle.manageButtonText}>Hábitos</Text>
                    </Pressable>
                </View>
                <CalendarGrid
                    monthDate={monthDate}
                    selectedDateKey={selectedDateKey}
                    monthSummary={monthSummary}
                    onChangeMonth={handleChangeMonth}
                    onSelectDate={handleSelectDate}
                />
                <HabitChecklist
                    habits={habits}
                    selectedDate={selectedDate}
                    checked={checked}
                    onToggle={handleToggleHabit}
                />
            </ScrollView>
        </SafeAreaView>
    )
}
