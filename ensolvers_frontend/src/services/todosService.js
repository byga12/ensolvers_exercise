import axios from "axios";

const getTodos = async () => {
  const res = await axios.get("http://localhost:3001/todos");
  return res.data;
};

const getTodo = async (id) => {
  const res = await axios.get(`http://localhost:3001/todos/${id}`);
  return res.data;
};

const createTodo = async (todo) => {
  const res = await axios.post("http://localhost:3001/todos", todo);
  return res.data;
};

const editTodo = async (id, todo) => {
  const res = await axios.put(`http://localhost:3001/todos/${id}`, todo);
  return res.data;
};

const removeTodo = async (id) => {
  const res = await axios.delete(`http://localhost:3001/todos/${id}`);
  return res.data;
};

export { getTodos, getTodo, createTodo, editTodo, removeTodo };
