import { getDateKey } from "../components/calendar/utils";

let selectedDateKey = getDateKey(new Date());

export const getCalendarSelectedDate = () => {
    const [year, month, day] = selectedDateKey.split("-").map(Number);

    return new Date(year, month - 1, day);
};

export const setCalendarSelectedDate = (date) => {
    selectedDateKey = getDateKey(date);
};
