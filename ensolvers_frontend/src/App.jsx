import TodoList from "./components/TodoList/TodoList";
import s from "./App.module.css";

function App() {
  return (
    <div className={s.appContainer}>
      <TodoList />
    </div>
  );
}

export default App;
