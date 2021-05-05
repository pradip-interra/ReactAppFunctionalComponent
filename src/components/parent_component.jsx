import React, { useState, useEffect, Component } from "react";
import FirstComponent from "./first_component";
import axios from "axios";

/** Model initialization. This will be passed to useState hook. */
const initData = {
  counters: [
    {
      id: 1,
      value: 0,
    },
    {
      id: 2,
      value: 0,
    },
    {
      id: 3,
      value: 0,
    },
    {
      id: 4,
      value: 0,
    },
  ],
  tags: ["tag1", "tag2", "tag3"],
};

const ParentComponent = (props) => {
  /** Defining the useState hook. */

  // this is where we are defining the state. The initData is the initialization.
  // the manipulation is done by calling setState methods appropriately.
  const [state, setState] = useState(initData);
  // updateState is a helper to call the setState. setState can also be called seperately.
  function updateState(newCounters) {
    setState((prevState) => ({
      counters: [...newCounters], // safer to clone, can be passed as-is also
      tags: [...prevState.tags], // safer to clone, an be passed as-is also
    }));
  }

  /** Defining the various methods will be called from the main portion.. */

  // This is the reset button handler in the parent. This is just an event binding, onClick of reset button, this code will be executed.
  function handleReset() {
    // going to reset the counter array in the state to make the values 0.
    const counters = [...state.counters];
    counters.map((counter) => (counter.value = 0));
    updateState(counters);
  }

  // this is the parent class button handler.
  // whereas onDelete is the this.props.onDelete on the button action binding in child.
  // that onDelete is bound to this handleDelete method.
  function handleDelete(counterId) {
    // dont directly write to the main object
    // get all but the currently deleting counter
    const localCounters = state.counters.filter(
      (counter) => counter.id !== counterId
    );
    // set the state where all the counters are there, but the current counter
    updateState(localCounters);
  }

  // This is the parent handler where the child is sending back the counterId as the data propagation on the click of the Increment button in child.
  // The onDelete is in the child which is bound to the Increment button as: onClick={() => this.props.onIncrement(this.props.counter.id)}
  function incrOrDecrement(increment, counter) {
    // find the counter from the counters array
    const index = state.counters.indexOf(counter);
    // copy the counters object
    const clonedCounters = [...state.counters];
    // set thisCnt in the currentCounter's array in proper position
    clonedCounters[index] = {
      id: counter.id,
      value:
        increment === true ? counter.value + 1 : Math.max(counter.value - 1, 0),
    };
    // set the new state
    updateState(clonedCounters);
  }
  function handleIncrement(counter) {
    incrOrDecrement(true, counter);
  }
  // similarly handleDecrement
  function handleDecrement(counter) {
    incrOrDecrement(false, counter);
  }

  /** The UI builder, will be called from the main portion. */
  function buildUI() {
    return (
      <div>
        <button
          className="btn btn-info btn-sm pb-2"
          onClick={() => handleReset()}
        >
          Reset
        </button>
        {state.counters.map((counter) => (
          <FirstComponent
            key={counter.id}
            counter={counter}
            tags={state.tags}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onDelete={handleDelete}
          ></FirstComponent>
        ))}
      </div>
    );
  }

  /** Main code block. */
  return buildUI();
};

export default ParentComponent;
