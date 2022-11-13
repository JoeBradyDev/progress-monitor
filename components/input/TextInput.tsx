import { format } from "date-fns";
import { FC, useState } from "react";

interface ITextInput {
  label?: string;
  max?: number;
  min?: number;
  name: string;
  step?: number;
  type?: "text" | "date" | "number";
  value?: string | Date | number | undefined;
}

const TextInput: FC<ITextInput> = (props) => {
  const { label, name, type = "text", value: initialValue, ...rest } = props;
  const [value, setValue] = useState(
    initialValue instanceof Date
      ? format(initialValue, "yyyy-MM-dd") + "T" + format(initialValue, "kk:mm")
      : initialValue
  );

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <>
      {!!label && (
        <label htmlFor={name} className="mt-4 block font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className="text-bold my-2 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-700 shadow-inner"
        name={name}
        onChange={(e) => handleChange(e)}
        type={type === "date" ? "datetime-local" : type}
        value={value}
        {...rest}
      />
    </>
  );
};

export default TextInput;
