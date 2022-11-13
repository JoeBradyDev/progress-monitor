export interface IInputAttributes {
  label?: string;
  max?: number;
  min?: number;
  name: string;
  step?: number;
  type: "text" | "date" | "number" | "checkbox" | "hidden";
  value?: string | Date | number | boolean;
}
