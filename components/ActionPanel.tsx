import { FC, useEffect } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useEsc } from "../utils/useEsc";

interface IActionPanelProps {
  onDelete: () => void;
  onEdit: () => void;
  onCancel: () => void;
  slug: string;
}

const ActionPanel: FC<IActionPanelProps> = ({
  onDelete: handleDelete,
  onCancel: toggleActions,
  onEdit: handleEdit,
}) => {
  const escPressed = useEsc();

  useEffect(() => {
    if (escPressed) {
      toggleActions();
    }
  }, [escPressed]);

  return (
    <>
      <div
        className="fixed inset-0 z-40 h-full w-full bg-gray-300 opacity-50"
        onClick={toggleActions}
      />
      <div className="absolute top-20 z-50 ml-10 mt-8">
        <div className="rounded-xl border-4 border-orange-200 bg-gray-50 p-3 drop-shadow-lg">
          <button className="m-0 mx-2 hover:text-blue-600" onClick={handleEdit}>
            <BiEdit className="mt-1 h-6 w-6 fill-current" />
          </button>
          <button
            className="m-0 mx-2 inline hover:text-red-600"
            onClick={handleDelete}
          >
            <BiTrash className="mt-1 h-6 w-6 fill-current" />
          </button>
        </div>
      </div>
    </>
  );
};
export default ActionPanel;
