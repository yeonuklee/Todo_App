import React, { useState } from "react";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from "react-icons/md";
import Todos from "./Todos";

const TodoItems = ({ setInput, status, setStatus, filtered, setFiltered }) => {
  //to remove the list that a user selects.
  const tRemove = (key) => {
    setInput(filtered.filter((task) => task.id !== key));
  };

  //when the completed button is clicked, It toggles the value of 'isCompleted'.
  //If the value of 'isCompleted' that is toggled by the click is true, which means It is completed task,
  //the soring value becomes -1, so that that list goes down at the bottom of all lists.
  const tComplete = (key) => {
    setInput(
      filtered.map((task) => {
        if (task.id == key) {
          task.isCompleted = !task.isCompleted;
          task.sorting = task.isCompleted == true ? -1 : 1;
        }
        return task;
      })
    );
  };

  //When a user double clicks the text of the list, It changes the value of 'isEditMode'
  const tEdit = (key) => {
    setInput(
      filtered.map((task) => {
        if (task.id == key) {
          task.isEditMode = !task.isEditMode;
        }
        return task;
      })
    );
    return (
      <input
        className="new-name"
        type="text"
        value={key}
        placeholder="Enter new name"
      />
    );
  };

  //All lists are sorted by value of sorting number(Ascending order).
  filtered.sort((a, b) => {
    return b.sorting - a.sorting;
  });

  return (
    <div className="list">
      {filtered.map((todo) => (
        <Todos
          todo={todo}
          setInput={setInput}
          tRemove={tRemove}
          tComplete={tComplete}
          tEdit={tEdit}
          filtered={filtered}
        />
      ))}
    </div>
  );
};

export default TodoItems;
