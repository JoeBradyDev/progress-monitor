import { IInputAttributes } from "../input/models";

export interface IFormInputMappings {
  [index: string]: IInputAttributes[];
  counter: IInputAttributes[];
}

export interface ITimer {
  [index: string]: string | Date | number | boolean | undefined;
  endDate?: string | Date;
  max?: number;
  min?: number;
  showTime?: boolean;
  slug: string;
  startDate?: string | Date;
  title: string;
  type: string;
  value?: number;
}

export interface IHoverTextMapping {
  [index: string]: string;
  counter: string;
  date: string;
}
