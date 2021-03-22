import React, { Children, useState, createRef } from "react";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
  MdDeleteForever,
  MdDone,
  MdEdit,
} from "react-icons/md";

const Todos = ({ todo, setInput, tRemove, tComplete, tEdit, filtered }) => {
  const todoRef = createRef();
  const newText = "";
  let priority = false;

  //In edit mode, the user is allowed to change the priority status and text.
  //The value of sorting number is changed depending on the completion and priority status.
  const changeText = (e) => {
    setInput(
      filtered.map((x) => {
        if (x.id == todo.id) {
          x.task = todoRef.current.value;
          x.isEditMode = !x.isEditMode;
          x.isPriority = priority ? !x.isPriority : x.isPriority;
          x.sorting = x.isPriority ? 1 : 0;
        }
        return x;
      })
    );
  };

  //The user can undo and reset priority by pressing the key 'shift+enter' in edit mode.
  const keyPress = (e) => {
    priority = e.shiftKey ? true : false;
    console.log("priority", priority);
    if (e.key == "Enter") changeText();
  };

  //When edit cancel button is clicked, It toggles the value of 'isEditMode'.
  const cancelChange = () => {
    setInput(
      filtered.map((task) => {
        if (task.id == todo.id) {
          task.isEditMode = !task.isEditMode;
        }
        return task;
      })
    );
  };

  //It is called when the value of 'isEditMode' is true.
  //The use can cancel the edit mode by clicking the delete button.
  //The use can change the list and update it by clicking complete button.
  const editTodo = (key) => {
    return (
      <div>
        <input
          type="text"
          defaultValue={newText}
          ref={todoRef}
          onKeyPress={keyPress}
        />
        <MdEdit onClick={changeText} />
        <MdRemoveCircleOutline onClick={cancelChange} />
      </div>
    );
  };

  //This is called when the value of 'isEditMode' is false, which is not editing now.
  //Then, when the text of list is double-clicked, It calls the function 'tEdit' to change the value of 'isEditMode'.
  //If the value of 'isPriority' is true, It changes the font-weight and '!' mark is added at the beginning of the text.
  const fixedTodo = () => {
    return (
      <span
        onDoubleClick={() => tEdit(todo.id)}
        style={
          todo.isPriority
            ? {
                fontWeight: "bold",
              }
            : { color: "default" }
        }
      >
        {todo.isPriority ? "❗" + todo.task : todo.task}
      </span>
    );
  };

  return (
    <div className="todo">
      <div
        className={todo.isCompleted ? "completed" : "todo-item"}
        key={todo.id}
      >
        {todo.isEditMode ? editTodo(todo.id) : fixedTodo(todo.id)}

        <MdDone
          className="complete-btn"
          onClick={() => tComplete(todo.id)}
          style={{ textDecoration: "line-through" }}
        />
        <MdDeleteForever
          className="delete-btn"
          onClick={() => tRemove(todo.id)}
        />
      </div>
    </div>
  );
};

export default Todos;
