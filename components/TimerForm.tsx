import { FC, FormEvent, useEffect } from "react";
import Button from "./input/Button";
import Checkbox from "./input/Checkbox";
import TextInput from "./input/TextInput";
import { IInputAttributes } from "./input/models";
import { format } from "date-fns";
import { useEsc } from "../utils/useEsc";

interface ITimerFormProps {
  formInputs: IInputAttributes[];
  onCancel: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  title: string;
}

const TimerForm: FC<ITimerFormProps> = ({
  formInputs,
  onCancel: toggleForm,
  onSubmit: handleSubmit,
  title,
}) => {
  const escPressed = useEsc();

  useEffect(() => {
    if (escPressed) {
      toggleForm();
    }
  }, [escPressed]);

  return (
    <>
      <div className="fixed inset-0 z-30 flex h-screen items-center justify-center">
        <div
          className="fixed inset-0 z-40 h-full w-full bg-gray-300 opacity-50"
          onClick={toggleForm}
        />
        <div className="z-50 w-96 rounded-xl border-4 border-orange-200 bg-gray-50 p-8 drop-shadow-lg">
          <h1 className="text-2xl font-medium text-sky-900">{title}</h1>
          <form onSubmit={handleSubmit}>
            {formInputs &&
              formInputs.map(
                ({
                  name,
                  label,
                  type,
                  max,
                  min,
                  step,
                  value: unformattedValue,
                }) => {
                  const value: any =
                    type === "date" && unformattedValue
                      ? format(unformattedValue as Date, "yyyy-MM-dd") +
                        "T" +
                        format(unformattedValue as Date, "HH:mm")
                      : unformattedValue;

                  return (
                    <>
                      {(type === "text" || type === "date") && (
                        <TextInput
                          key={name}
                          label={label}
                          name={name}
                          type={type}
                          value={typeof value !== "boolean" ? value : ""}
                        />
                      )}
                      {type === "number" && (
                        <TextInput
                          key={name}
                          label={label}
                          max={max}
                          min={min}
                          name={name}
                          step={step}
                          type={type}
                          value={typeof value === "number" ? value : undefined}
                        />
                      )}
                      {type === "checkbox" && (
                        <Checkbox label={label} name={name} checked={value} />
                      )}
                      {type === "hidden" && (
                        <input
                          type="hidden"
                          name={name}
                          value={String(value)}
                        />
                      )}
                    </>
                  );
                }
              )}
            <div className="mt-10 flex justify-end space-x-4">
              <Button type="button" onClick={toggleForm}>
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TimerForm;
