import { useState } from "react";
import { editTodo, getTodo, removeTodo } from "../../services/todosService";
import s from "./Todo.module.css";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Todo = ({ id, title, isDone, setTodoList }) => {
  const [open, setOpen] = useState(false);
  const [todoData, setTodoData] = useState({
    title,
    isDone,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditTodo = async (e, id) => {
    e.preventDefault();
    const newTitle = e.target.addTodoInput.value;
    const oldTodo = await getTodo(id);
    await editTodo(id, { ...oldTodo, title: newTitle });
    setTodoData({ ...todoData, title: newTitle });
    handleClose();
  };

  const handleRemoveTodo = (id) => {
    removeTodo(id).then(() =>
      setTodoList((previousState) =>
        previousState.filter((todo) => todo.id !== id)
      )
    );
  };

  const handleIsDoneState = async (e) => {
    setTodoData({ ...todoData, isDone: !todoData.isDone });
    const id = e.target.id;
    const todo = await getTodo(id);
    await editTodo(id, { ...todo, isDone: !todo.isDone });
  };

  return (
    <>
      <div className={s.todoContainer}>
        <form
          className={`${s.todoTitleContainer} ${
            todoData.isDone ? s.isLinedThrough : null
          }`}
        >
          <input
            checked={todoData.isDone}
            onChange={(e) => handleIsDoneState(e)}
            type="checkbox"
            id={id}
          />
          <label htmlFor={id}>{todoData.title}</label>
        </form>
        <div className={s.todoActionsContainer}>
          <h3 className={s.actionButton} onClick={handleOpen}>
            Edit
          </h3>
          <h3 className={s.actionButton} onClick={() => handleRemoveTodo(id)}>
            Remove
          </h3>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent sx={{ padding: "2.5rem 2rem" }}>
          <form
            autoComplete="off"
            onSubmit={(e) => {
              handleEditTodo(e, id);
            }}
          >
            <h2
              className={s.todoListTitle}
              id="alert-dialog-title"
            >{`Editing Task "${title}"`}</h2>
            <input
              autoFocus
              required
              className={s.addTodoInput}
              type="text"
              placeholder={title}
              name="addTodoInput"
            />
            <div className={s.dialogActions}>
              <button type="submit">Save</button>
              <button className={s.addTodoBtn} onClick={handleClose}>
                Cancel
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Todo;
