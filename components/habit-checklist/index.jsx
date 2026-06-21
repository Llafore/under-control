import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { HabitItem } from "./item";
import { createChecklistStyle } from "./styles";
import { getInitialState, getTodayKey } from "./utils";

const HABITS = [
    { id: "1", label: "Beber 2L de água" },
    { id: "2", label: "30min de exercício" },
    { id: "3", label: "Ler 20 páginas" },
    { id: "4", label: "Meditar" },
    { id: "5", label: "Dormir antes da meia-noite" },
];

export const HabitChecklist = () => {
    const todayKey = getTodayKey();
    const [checked, setChecked] = useState(() => getInitialState(todayKey));

    const toggle = (id) => {
        setChecked((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const doneCount = Object.values(checked).filter(Boolean).length;
    const style = createChecklistStyle();

    return (
        <ScrollView contentContainerStyle={style.container}>
            <View style={style.header}>
                <Text style={style.title}>Hábitos de hoje</Text>
                <Text style={style.counter}>{doneCount}/{HABITS.length}</Text>
            </View>

            <View style={style.progressBarTrack}>
                <View
                    style={[
                        style.progressBarFill,
                        { width: `${(doneCount / HABITS.length) * 100}%` },
                    ]}
                />
            </View>

            <View style={style.list}>
                {HABITS.map((habit) => (
                    <HabitItem
                        key={habit.id}
                        label={habit.label}
                        done={!!checked[habit.id]}
                        onToggle={() => toggle(habit.id)}
                    />
                ))}
            </View>
        </ScrollView>
    );
};