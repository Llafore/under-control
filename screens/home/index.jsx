import { View } from "react-native"
import { CalendarGrid } from "../../components/calendar"
import { HabitChecklist } from "../../components/habit-checklist"
import { HomeStyle } from "./styles"

export const HomePage = () => {

    return(
        <View style={HomeStyle.conteiner}>
            <CalendarGrid/>
            <HabitChecklist />
        </View>
    )
}