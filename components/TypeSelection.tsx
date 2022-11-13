import { FC, useEffect } from "react";
import { BiAbacus, BiCalendar } from "react-icons/bi";
import { useEsc } from "../utils/useEsc";

interface ITypeSelectionProps {
  onAddCounter: () => void;
  onAddDateTimer: () => void;
  onCancel: () => void;
}

const TypeSelection: FC<ITypeSelectionProps> = ({
  onAddCounter: handleAddCounter,
  onAddDateTimer: handleAddDateTimer,
  onCancel: toggleTypeSelection,
}) => {
  const escPressed = useEsc();

  useEffect(() => {
    if (escPressed) {
      toggleTypeSelection();
    }
  }, [escPressed]);

  return (
    <>
      <div
        className="fixed inset-0 z-40 h-full w-full bg-gray-300 opacity-50"
        onClick={toggleTypeSelection}
      />
      <div className="absolute right-0 bottom-20 z-50 ml-5">
        <div className="rounded-xl border-4 border-orange-200 bg-gray-50 p-3 drop-shadow-lg">
          <button
            className="m-0 mx-2 hover:text-blue-600"
            onClick={handleAddCounter}
          >
            <BiAbacus className="mt-1 h-6 w-6 fill-current" />
          </button>
          <button
            className="m-0 mx-2 hover:text-red-600"
            onClick={handleAddDateTimer}
          >
            <BiCalendar className="mt-1 h-6 w-6 fill-current" />
          </button>
        </div>
      </div>
    </>
  );
};

export default TypeSelection;
