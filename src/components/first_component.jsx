import React, { useState, useEffect, Component } from "react";
import axios from "axios";

const styles = {
  fontSize: 20,
  foneWeight: "bold",
};

const FirstComponent = (props) => {
  /** Declare all the functions we need in the main code block. */
  function conditionalClass() {
    let classes = "badge m-2 badge-";
    classes += props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  function formatCount() {
    // const { count } = this.state; // object deconstruction to count
    const { value } = props.counter; // object deconstruction to count. This means props.counter.value is assigned to lhs value const.
    return value === 0 ? "Zero" : value;
  }

  // *ngIf equivalent
  function renderConditional() {
    if (props.tags.length === 0) {
      return <p> Oh no! No element. </p>;
    } else {
      return (
        <div>
          <span className={conditionalClass()}>{formatCount()}</span>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => props.onIncrement(props.counter)}
          >
            Increment
          </button>
          <button
            className="btn btn-warning btn-sm ml-2"
            onClick={() => props.onDecrement(props.counter)}
          >
            Decrement
          </button>
          <button
            className="btn btn-danger btn-sm ml-2"
            onClick={() => props.onDelete(props.counter.id)}
          >
            Delete
          </button>
          {/* <ul>
            {this.state.tags.map((
              tag // *ngFor equivalent
            ) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul> */}
        </div>
      );
    }
  }

  /** Main code block. */
  return renderConditional();
};

export default FirstComponent;
