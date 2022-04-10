import { useEffect, useState } from "react";
import { getTodos } from "../../services/todosService";
import Todo from "../Todo/Todo";
import s from "./TodoList.module.css";
import { createTodo } from "../../services/todosService";

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    getTodos().then((res) => setTodoList(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let todoTitle = e.target.addTodoInput.value;
    const todo = {
      title: todoTitle,
      description: "",
      isDone: false,
    };
    createTodo(todo).then((res) => {
      e.target.addTodoInput.value = "";
      setTodoList(todoList.concat(res));
    });
  };

  return (
    <div className={s.todoListContainer}>
      <h2 className={s.todoListTitle}>To-Do List</h2>
      <ul className={s.todoListUl}>
        {todoList.map((todo) => (
          <li key={todo.id}>
            <Todo {...todo} setTodoList={setTodoList} />
          </li>
        ))}
      </ul>
      <form
        autoComplete="off"
        className={s.addTodoWrapper}
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          required
          name="addTodoInput"
          type="text"
          placeholder="e.g: Practice major scales"
          className={s.addTodoInput}
        />
        <button type="submit" className={s.addTodoBtn}>
          Add
        </button>
      </form>
    </div>
  );
};

export default TodoList;
