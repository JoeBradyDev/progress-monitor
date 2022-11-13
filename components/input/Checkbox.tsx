import { FC, useState } from "react";

interface ICheckbox {
  label?: string;
  name: string;
  checked?: boolean;
}

const Checkbox: FC<ICheckbox> = (props) => {
  const { label, name, checked: initialChecked, ...rest } = props;
  const [checked, setChecked] = useState(initialChecked);

  const handleChange = (e: any) => {
    setChecked(!checked);
  };

  return (
    <div className="mt-4">
      <label className="font-medium text-gray-700">
        <input
          checked={checked}
          name={name}
          onChange={handleChange}
          type="checkbox"
          {...rest}
        />
        <span className="pl-2">{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
