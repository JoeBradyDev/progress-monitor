import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FormEvent, useContext, useEffect, useState } from "react";
import TimerGroup from "../components/TimerGroup";
import DefaultLayout from "./layouts/default";
import { FORM_INPUTS, parseTimerFormEvent } from "../components/Timer/utils";
import TimerForm from "../components/TimerForm";
import TypeSelection from "../components/TypeSelection";
import Button from "../components/input/Button";
import { BiPlus } from "react-icons/bi";
import { useTimers } from "../components/TimerProvider";
import { useTimerActions } from "../components/TimerProvider/actions";

const Home: NextPage = () => {
  const timers = useTimers();
  const { addTimer } = useTimerActions();

  const [formInputs, setFormInputs] = useState(FORM_INPUTS["date"]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showTypeSelection, setShowTypeSelection] = useState(false);

  const openForm = (type: "date" | "counter") => {
    setFormInputs(FORM_INPUTS[type]);
    setShowAddForm(true);
    setShowTypeSelection(false);
  };

  const closeDialogs = () => {
    setShowAddForm(false);
    setShowTypeSelection(false);
  };

  const toggleShowTypeSelection = () => {
    setShowTypeSelection(!showTypeSelection);
  };

  const handleAddTimer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValues = parseTimerFormEvent(e);
    addTimer(inputValues);
    closeDialogs();
  };

  return (
    <>
      <Head>
        <title>Progress Monitor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultLayout>
        {!!timers && <TimerGroup timers={timers} />}
        {showAddForm && (
          <TimerForm
            formInputs={formInputs}
            onCancel={closeDialogs}
            onSubmit={handleAddTimer}
            title={"Add Timer"}
          />
        )}
        <div className="relative">
          {showTypeSelection && (
            <TypeSelection
              onAddCounter={() => openForm("counter")}
              onAddDateTimer={() => openForm("date")}
              onCancel={closeDialogs}
            />
          )}
        </div>
        <div className="fixed right-0 bottom-0 m-6">
          <Button
            type="button"
            color="green"
            isCircle
            onClick={toggleShowTypeSelection}
          >
            <BiPlus />
          </Button>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Home;
