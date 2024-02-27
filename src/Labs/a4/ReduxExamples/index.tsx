import React from "react";
import CounterRedux from "./CounterRedux";
import AddRedux from "./AddRedux";
import TodoList from "./todos/TodoList";

const ReduxExamples = () => {
  return(
    <div>
      <h2>Redux Examples</h2>
      <CounterRedux />
      <AddRedux />
      <TodoList />
    </div>
  );
};

export default ReduxExamples;