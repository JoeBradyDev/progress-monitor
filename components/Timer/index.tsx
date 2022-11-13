import { FC, FormEvent, useEffect, useState } from "react";
import ActionPanel from "../ActionPanel";
import CircularProgress from "../CircularProgress";
import { IHoverTextMapping, ITimer } from "./models";
import {
  calcPercentage,
  formatEndText,
  formatStartText,
  FORM_INPUTS,
  parseTimerFormEvent,
} from "./utils";
import TimerForm from "../TimerForm";
import { useTimerActions } from "../TimerProvider/actions";

interface ITimerProps {
  timer: ITimer;
}

const Timer: FC<ITimerProps> = ({ timer }) => {
  const [showActions, setShowActions] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [percentage, setPercentage] = useState(calcPercentage(timer));
  const { deleteTimer, updateTimer } = useTimerActions();

  const hoverTextMapping: IHoverTextMapping = {
    counter: String(timer.value),
    date: `${percentage}%`,
  };

  const hoverText = hoverTextMapping[timer.type];

  const formInputs = FORM_INPUTS[timer.type].map((input) => {
    const value = timer[input.name];
    return {
      ...input,
      value,
    };
  });

  const toggleActions = () => {
    setShowActions(!showActions);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setShowActions(false);
  };

  const handleDeleteTimer = () => {
    if (timer.slug) {
      deleteTimer(timer.slug);
    }
  };

  const handleUpdateTimer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValues = parseTimerFormEvent(e);
    updateTimer(inputValues);
    toggleForm();
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setPercentage(calcPercentage(timer));
    }, 1000);

    return () => clearInterval(timerId);
  }, [setPercentage, calcPercentage, timer]);

  return (
    <div>
      <h2 className="text-center text-2xl font-bold text-gray-900">
        {timer.title}
      </h2>
      <button
        className={`z-20 mt-3 rounded-full bg-gray-50 opacity-100 ring-1 ring-blue-300 drop-shadow-lg`}
        onClick={toggleActions}
      >
        <CircularProgress
          color="rgb(2 132 199)"
          endText={formatEndText(timer)}
          hoverText={hoverText}
          percentage={percentage}
          showTime={!!timer?.showTime ?? false}
          size={200}
          startText={formatStartText(timer)}
          strokeWidth={10}
        />
      </button>
      {showActions && (
        <ActionPanel
          onDelete={handleDeleteTimer}
          onCancel={toggleActions}
          onEdit={toggleForm}
          slug={timer.slug}
        />
      )}
      {showForm && (
        <TimerForm
          formInputs={formInputs}
          onCancel={toggleForm}
          onSubmit={handleUpdateTimer}
          title="Edit Timer"
        />
      )}
    </div>
  );
};

export default Timer;
