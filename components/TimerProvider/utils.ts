import { ITimer } from "../Timer/models";

export const INITIAL_TIMERS: ITimer[] = [
  {
    slug: "work-day",
    title: "Work Day",
    type: "date",
    showTime: true,
    startDate: new Date("2022-07-05 12:30:00.000Z"),
    endDate: new Date("2022-07-05 21:30:00.000Z"),
  },
  {
    slug: "work-week",
    title: "Work Week",
    type: "date",
    startDate: new Date("2022-07-08 12:30:00.000Z"),
    endDate: new Date("2022-07-08 21:30:00.000Z"),
  },
  {
    slug: "month",
    title: "Month",
    type: "date",
    startDate: new Date("2022-06-01 12:30:00.000Z"),
    endDate: new Date("2022-06-30 21:30:00.000Z"),
  },
  {
    slug: "year",
    title: "Year",
    type: "date",
    startDate: new Date("2022-01-01 06:00:00.000Z"),
    endDate: new Date("2022-12-31 17:59:59.000Z"),
  },
  {
    slug: "sprint",
    title: "Sprint 22-3",
    type: "date",
    startDate: new Date("2022-07-11 12:30:00.000Z"),
    endDate: new Date("2022-08-19 21:30:00.000Z"),
  },
  {
    slug: "wgu-term",
    title: "WGU Term",
    type: "date",
    startDate: new Date("2022-06-01 00:00:00.000Z"),
    endDate: new Date("2022-11-30 00:00:00.000Z"),
  },
  {
    slug: "wgu-degree",
    title: "WGU Degree",
    type: "counter",
    min: 0,
    max: 122,
    value: 102,
  },
];

export const convertStringsToTypes = (timers: ITimer[]) => {
  return timers.map((timer) => {
    if (
      timer.type === "date" &&
      typeof timer.startDate === "string" &&
      typeof timer.endDate === "string"
    ) {
      return {
        ...timer,
        startDate: new Date(timer.startDate),
        endDate: new Date(timer.endDate),
      };
    }

    if (
      timer.type === "counter" &&
      typeof timer.min === "string" &&
      typeof timer.max === "string" &&
      typeof timer.value === "string"
    ) {
      return {
        ...timer,
        min: Number(timer.min),
        max: Number(timer.max),
        value: Number(timer.value),
      };
    }

    return timer;
  });
};
