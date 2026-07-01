import { Text, View } from "react-native";
import { HabitItem } from "./item";
import { createChecklistStyle } from "./styles";
import { getFullDateLabel } from "../calendar/utils";

export const HabitChecklist = ({ habits, selectedDate, checked, onToggle }) => {
    const doneCount = habits.filter((habit) => checked[habit.id]).length;
    const progress = habits.length ? (doneCount / habits.length) * 100 : 0;
    const style = createChecklistStyle();

    return (
        <View style={style.container}>
            <View style={style.header}>
                <View>
                    <Text style={style.title}>{getFullDateLabel(selectedDate)}</Text>
                </View>
                <Text style={style.counter}>{doneCount}/{habits.length}</Text>
            </View>

            <View style={style.progressBarTrack}>
                <View
                    style={[
                        style.progressBarFill,
                        { width: `${progress}%` },
                    ]}
                />
            </View>

            <View style={style.list}>
                {habits.length ? habits.map((habit) => (
                    <HabitItem
                        key={habit.id}
                        label={habit.label}
                        done={!!checked[habit.id]}
                        onToggle={() => onToggle(habit.id)}
                    />
                )) : (
                    <Text style={style.emptyText}>Nenhum hábito ativo nesta data.</Text>
                )}
            </View>
        </View>
    );
};
