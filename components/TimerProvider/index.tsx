import {
  createContext,
  FC,
  ReactElement,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { ITimer } from "../Timer/models";
import { convertStringsToTypes, INITIAL_TIMERS } from "./utils";

export const TimerStateContext = createContext<ITimer[]>([]);
export const TimerDispatchContext = createContext({});

const reducer = (state: ITimer[], action: any): ITimer[] => {
  switch (action.type) {
    case "INITIALIZE":
      return action.payload;
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter(({ slug }: ITimer) => slug !== action.payload);
    case "UPDATE":
      return state.map((timer) =>
        timer.slug == action.payload.slug ? action.payload : timer
      );
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

interface ITimerProviderProps {
  children?: ReactElement;
}

export const TimerProvider: FC<ITimerProviderProps> = ({ children }) => {
  const [localStorageLoaded, setLocalStorageLoaded] = useState(false);
  const [state, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    if (localStorageLoaded) {
      localStorage.setItem("timers", JSON.stringify(state));
      return;
    }

    const lsTimerString = localStorage.getItem("timers");
    let timers: ITimer[] = INITIAL_TIMERS;

    if (lsTimerString) {
      try {
        timers = convertStringsToTypes(JSON.parse(lsTimerString));
      } catch {
        timers = INITIAL_TIMERS;
      }
    }

    dispatch({
      type: "INITIALIZE",
      payload: timers,
    });

    setLocalStorageLoaded(true);
  }, [state, convertStringsToTypes]);

  return (
    <TimerDispatchContext.Provider value={dispatch}>
      <TimerStateContext.Provider value={state}>
        {children}
      </TimerStateContext.Provider>
    </TimerDispatchContext.Provider>
  );
};

export const useTimers = () => useContext(TimerStateContext);
export const useDispatchTimers = () => useContext(TimerDispatchContext);
