export const defineGridPadding = (width) => {
    const gridPadding = width * 0.05;
    return gridPadding > 0 ? gridPadding : 1
}

const WEEK_DAYS = ["D", "S", "T", "Q", "Q", "S", "S"];
const MONTHS = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
];

const pad = (value) => String(value).padStart(2, "0");

export const getDateKey = (date) => {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

export const getTodayKey = () => getDateKey(new Date());

export const getMonthLabel = (date) => MONTHS[date.getMonth()];

export const getMonthNames = () => MONTHS;

export const getFullDateLabel = (date) => {
    return `${date.getDate()} de ${MONTHS[date.getMonth()]}`;
};

export const addMonths = (date, amount) => {
    return new Date(date.getFullYear(), date.getMonth() + amount, 1);
};

export const buildMonthCells = (monthDate) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const leadingEmptyCells = firstDay.getDay();
    const cells = [];

    for (let i = 0; i < leadingEmptyCells; i += 1) {
        cells.push({ key: `empty-start-${i}`, empty: true });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
        const date = new Date(year, month, day);
        cells.push({
            key: getDateKey(date),
            date,
            dateKey: getDateKey(date),
            day,
            empty: false,
        });
    }

    while (cells.length % 7 !== 0) {
        cells.push({ key: `empty-end-${cells.length}`, empty: true });
    }

    return cells;
};

export const getWeekDays = () => WEEK_DAYS;
