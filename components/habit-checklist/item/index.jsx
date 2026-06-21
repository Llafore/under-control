import { Pressable, Text, View } from "react-native";
import { createItemStyle } from "./styles";

export const HabitItem = ({ label, done, onToggle }) => {
    const style = createItemStyle(done);

    return (
        <Pressable
            onPress={onToggle}
            style={({ pressed }) => [style.row, pressed && style.pressed]}
        >
            <View style={style.checkbox}>
                {done && <View style={style.checkboxInner} />}
            </View>
            <Text style={style.label}>{label}</Text>
        </Pressable>
    );
};