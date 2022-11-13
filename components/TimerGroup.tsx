import cc from "classcat";
import { FC } from "react";
import Timer from "./Timer";
import { ITimer } from "./Timer/models";

interface ITimerGroupProps {
  timers: ITimer[];
}

const TimerGroup: FC<ITimerGroupProps> = ({ timers }) => {
  return (
    <main className="flex h-full w-full flex-col justify-center bg-gradient-to-r from-slate-50 to-sky-100  p-4 ">
      <div className="-mt-12 flex flex-wrap items-end justify-evenly">
        {timers.map((timer: ITimer) => (
          <div
            key={timer.slug}
            className={cc([
              "relative mt-12 flex w-1/2 flex-col items-center align-baseline sm:w-1/3",
              {
                "md:w-1/4 lg:w-1/4": timers.length % 4 !== 1, // Standard (md/lg/xl)
                "md:w-1/3 lg:w-1/3": timers.length % 4 === 1, // 1 Orphan Timer
                "2xl:w-1/5": timers.length % 5 !== 1, // Standard (md/lg/xl)
                "2xl:w-1/4": timers.length % 5 === 1, // 1 Orphan Timer
              },
            ])}
          >
            <Timer key={timer.slug} timer={timer} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default TimerGroup;
