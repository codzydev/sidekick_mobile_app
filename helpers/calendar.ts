import { DateTime } from "luxon";

export interface dayData {
  date: DateTime;
  isToday: boolean;
}

export type weekData = dayData[];
export type calendarData = weekData[];

/**
 * Generate all weeks intersecting the given month, including:
 * - One full week before the 1st of the month
 * - One full week after the end of the month
 * Each week contains 7 days (Mon–Sun).
 */
export function getDaysInMonthSplitByWeek(): calendarData {
  const today = DateTime.now().startOf("day");
  const now: DateTime = DateTime.now();
  const month = now.month;
  const year = now.year;
  const firstDayOfMonth = DateTime.local(year, month, 1);
  const lastDayOfMonth = firstDayOfMonth.endOf("month");

  // Always start from Monday before the first visible week
  const startDate = firstDayOfMonth
    .minus({ days: firstDayOfMonth.weekday - 1 })
    .minus({ days: 7 });

  // Always end on Sunday after the last visible week
  const endDate = lastDayOfMonth
    .plus({ days: 7 - lastDayOfMonth.weekday })
    .plus({ days: 7 });

  const weeks: calendarData = [];
  let currentWeek: weekData = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    const isToday = currentDate.hasSame(today, "day");
    currentWeek.push({ date: currentDate, isToday });

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    currentDate = currentDate.plus({ days: 1 });
  }

  return weeks;
}

/**
 * Get the index of the week containing today's date.
 */
export const getTodayIndex = (weeks: calendarData): number => {
  return weeks.findIndex((week) => week.some((day) => day.isToday));
};

export const getShortWeeks = (): calendarData => {
  const weeks = getDaysInMonthSplitByWeek();
  const currentIndex = getTodayIndex(weeks);
  const start = Math.max(currentIndex - 1, 0);
  const end = Math.min(currentIndex + 1, weeks.length); // +2 to include next week
  return weeks.slice(start, end);
};
