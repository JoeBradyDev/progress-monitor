import {
  differenceInSeconds,
  format,
  isAfter,
  isBefore,
  isEqual,
} from "date-fns";
import { FormEvent } from "react";
import { ITimer, IFormInputMappings } from "./models";

export const FORM_INPUTS: IFormInputMappings = {
  counter: [
    {
      name: "type",
      type: "hidden",
      value: "counter",
    },
    {
      label: "Title",
      name: "title",
      type: "text",
    },
    {
      label: "Slug",
      name: "slug",
      type: "text",
    },
    {
      label: "Min",
      name: "min",
      type: "number",
    },
    {
      label: "Max",
      name: "max",
      type: "number",
    },
    {
      label: "Value",
      name: "value",
      type: "number",
    },
  ],
  date: [
    {
      name: "type",
      type: "hidden",
      value: "date",
    },
    {
      label: "Title",
      name: "title",
      type: "text",
    },
    {
      label: "Slug",
      name: "slug",
      type: "text",
    },
    {
      label: "Start Date",
      name: "startDate",
      type: "date",
    },
    {
      label: "End Date",
      name: "endDate",
      type: "date",
    },
    {
      label: "Show Time",
      name: "showTime",
      type: "checkbox",
    },
  ],
};

export const round = (number: any, decimalPlaces: any) => {
  const factorOfTen = Math.pow(10, decimalPlaces);
  return Math.round(number * factorOfTen) / factorOfTen;
};

export const calcPercentage = (timer: ITimer) => {
  if (timer.type === "counter") {
    const { min = 1, max = 1, value = 0 } = timer;
    return round(value / (max - min), 2) * 100;
  }

  const now = new Date();
  const { startDate, endDate } = timer;

  if (
    timer.type !== "date" ||
    !startDate ||
    typeof startDate === "string" ||
    !endDate ||
    typeof endDate === "string"
  ) {
    return 0;
  }

  if (isEqual(now, endDate) || isAfter(now, endDate)) {
    return 100;
  }

  if (isAfter(now, startDate) && isBefore(now, endDate)) {
    const totalSeconds = differenceInSeconds(startDate, endDate);
    const elapsedSeconds = differenceInSeconds(startDate, now);
    return round(elapsedSeconds / totalSeconds, 2) * 100;
  }

  return 0;
};

export const formatTimerDateText = (
  timer: ITimer,
  calcStart: boolean
): string => {
  if (timer.type === "counter") {
    return String(calcStart ? timer.min : timer.max);
  }

  const date = calcStart ? timer.startDate : timer.endDate;

  if (!date || typeof date === "string") {
    return "";
  }

  return timer?.showTime ? format(date, "h:mm aaa") : format(date, "M/d/yy");
};

export const formatStartText = (timer: ITimer): string => {
  return formatTimerDateText(timer, true);
};

export const formatEndText = (timer: ITimer): string => {
  return formatTimerDateText(timer, false);
};

export const convertType = (type: string, value: any) => {
  switch (type) {
    case "number":
      return Number(value);
    case "date":
      return value instanceof Date ? value : new Date(value);
    default:
      return value;
  }
};

export const parseTimerFormEvent = (e: FormEvent<HTMLFormElement>) => {
  const form = e.currentTarget;
  const inputValues = FORM_INPUTS[form.type.value].reduce(
    (prev, { type, name }) => {
      const el = form[name];
      const value =
        type === "checkbox" ? el.checked : convertType(type, el.value);
      return {
        ...prev,
        [name]: value,
      };
    },
    {}
  );

  return inputValues;
};
