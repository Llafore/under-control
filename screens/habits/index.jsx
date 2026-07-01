import { useCallback, useState } from "react";
import { Alert, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    createHabit,
    hardDeleteHabit,
    initHabitsDatabase,
    listManagedHabits,
    softDeleteHabit,
    updateHabit,
} from "../../data/habitsRepository";
import { HabitsStyle } from "./styles";

const EMPTY_FORM = {
    title: "",
    description: "",
};

export const HabitsPage = () => {
    const router = useRouter();
    const [habits, setHabits] = useState([]);
    const [selectedHabitId, setSelectedHabitId] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);

    const selectedHabit = habits.find((habit) => habit.id === selectedHabitId);
    const isEditing = !!selectedHabitId;

    const loadHabits = useCallback(async () => {
        await initHabitsDatabase();
        setHabits(await listManagedHabits());
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadHabits();
        }, [loadHabits])
    );

    const resetForm = () => {
        setSelectedHabitId(null);
        setForm(EMPTY_FORM);
    };

    const selectHabit = (habit) => {
        setSelectedHabitId(habit.id);
        setForm({
            title: habit.title,
            description: habit.description,
        });
    };

    const saveHabit = async () => {
        if (!form.title.trim()) {
            Alert.alert("Título obrigatório", "Informe um título para o hábito.");
            return;
        }

        if (isEditing) {
            await updateHabit(selectedHabitId, form);
        } else {
            await createHabit(form);
        }

        resetForm();
        await loadHabits();
    };

    const removeHabit = async (habit) => {
        await softDeleteHabit(habit.id);

        if (habit.id === selectedHabitId) {
            resetForm();
        }

        await loadHabits();
    };

    const destroyHabit = async (habit) => {
        await hardDeleteHabit(habit.id);

        if (habit.id === selectedHabitId) {
            resetForm();
        }

        await loadHabits();
    };

    return (
        <SafeAreaView style={HabitsStyle.container}>
            <ScrollView
                contentContainerStyle={HabitsStyle.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={HabitsStyle.topBar}>
                    <Pressable
                        accessibilityRole="button"
                        onPress={() => router.back()}
                        style={({ pressed }) => [HabitsStyle.backButton, pressed && HabitsStyle.pressed]}
                    >
                        <Text style={HabitsStyle.backButtonText}>{"<"}</Text>
                    </Pressable>
                    <Text style={HabitsStyle.title}>Hábitos</Text>
                    <View style={HabitsStyle.topBarSpacer} />
                </View>

                <View style={HabitsStyle.form}>
                    <Text style={HabitsStyle.formTitle}>
                        {isEditing ? "Editar hábito" : "Novo hábito"}
                    </Text>

                    <TextInput
                        value={form.title}
                        onChangeText={(title) => setForm((currentForm) => ({ ...currentForm, title }))}
                        placeholder="Título"
                        placeholderTextColor="#6E7681"
                        style={HabitsStyle.input}
                    />

                    <TextInput
                        value={form.description}
                        onChangeText={(description) => setForm((currentForm) => ({ ...currentForm, description }))}
                        placeholder="Descrição"
                        placeholderTextColor="#6E7681"
                        multiline
                        style={[HabitsStyle.input, HabitsStyle.textArea]}
                    />

                    <View style={HabitsStyle.formActions}>
                        {isEditing && (
                            <Pressable
                                accessibilityRole="button"
                                onPress={resetForm}
                                style={HabitsStyle.secondaryButton}
                            >
                                <Text style={HabitsStyle.secondaryButtonText}>Novo</Text>
                            </Pressable>
                        )}
                        <Pressable
                            accessibilityRole="button"
                            onPress={saveHabit}
                            style={HabitsStyle.primaryButton}
                        >
                            <Text style={HabitsStyle.primaryButtonText}>
                                {isEditing ? "Atualizar" : "Criar"}
                            </Text>
                        </Pressable>
                    </View>

                    {selectedHabit?.deleted_at && (
                        <Text style={HabitsStyle.deletedHint}>
                            Este hábito foi removido a partir de {selectedHabit.deleted_at}.
                        </Text>
                    )}
                </View>

                <View style={HabitsStyle.list}>
                    {habits.map((habit) => {
                        const selected = habit.id === selectedHabitId;
                        const deleted = !!habit.deleted_at;

                        return (
                            <Pressable
                                key={habit.id}
                                accessibilityRole="button"
                                onPress={() => selectHabit(habit)}
                                style={[
                                    HabitsStyle.item,
                                    selected && HabitsStyle.itemSelected,
                                    deleted && HabitsStyle.itemDeleted,
                                ]}
                            >
                                <View style={HabitsStyle.itemContent}>
                                    <Text style={HabitsStyle.itemTitle}>{habit.title}</Text>
                                    {!!habit.description && (
                                        <Text style={HabitsStyle.itemDescription}>{habit.description}</Text>
                                    )}
                                    <Text style={HabitsStyle.itemMeta}>
                                        Criado em {habit.created_at}
                                        {deleted ? ` · removido em ${habit.deleted_at}` : ""}
                                    </Text>
                                </View>

                                <View style={HabitsStyle.itemActions}>
                                    {!deleted && (
                                        <Pressable
                                            accessibilityRole="button"
                                            onPress={() => removeHabit(habit)}
                                            style={HabitsStyle.softDeleteButton}
                                        >
                                            <Text style={HabitsStyle.softDeleteText}>Remover</Text>
                                        </Pressable>
                                    )}
                                    <Pressable
                                        accessibilityRole="button"
                                        onPress={() => destroyHabit(habit)}
                                        style={HabitsStyle.hardDeleteButton}
                                    >
                                        <Text style={HabitsStyle.hardDeleteText}>Excluir tudo</Text>
                                    </Pressable>
                                </View>
                            </Pressable>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
