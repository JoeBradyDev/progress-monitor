import { ITimer } from "../Timer/models";

export interface ITimerProviderContext {
  addTimer: () => void;
  deleteTimer: () => void;
  updateTimer: () => void;
  timers: ITimer[];
}
