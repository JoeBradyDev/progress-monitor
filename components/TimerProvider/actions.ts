import { useDispatchTimers } from ".";
import { ITimer } from "../Timer/models";

export const useTimerActions = () => {
  const dispatch: any = useDispatchTimers();

  const addTimer = (timer: any) => {
    dispatch({
      type: "ADD",
      payload: timer,
    });
  };

  const deleteTimer = (slug: string) => {
    console.log("Delete action");
    dispatch({
      type: "DELETE",
      payload: slug,
    });
  };

  const updateTimer = (timer: any) => {
    dispatch({
      type: "UPDATE",
      payload: timer,
    });
  };

  return {
    addTimer,
    deleteTimer,
    updateTimer,
  };
};
