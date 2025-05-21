import { useEffect, useState } from 'react'
import './App.css'

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  const baseEp = "/todos";
  const idEp = (id: number) => baseEp + `/${id}`

  const getTodos = async () => {
    const res = await fetch(baseEp);
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async () => {
    await fetch(baseEp, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setTitle("");
    getTodos();
  };

  const toggleTodo = async (id: number, completed: boolean) => {
    await fetch(idEp(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    getTodos();
  }

  const deleteTodo = async (id: number) => {
    await fetch(idEp(id), {
      method: "DELETE",
    });
    getTodos();
  }

  return (
    <div className="todo-app">
      <h1 className="todo-app__title">To-dos</h1>

      <form
        className="todo-app__form"
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <input
          className="todo-app__input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs doing?"
        />
        <button type="submit" className="todo-app__add-btn">
          Add To-do
        </button>
      </form>

      <ul className="todo-app__list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-app__item">
            <span
              className={
                "todo-app__item-text" +
                (todo.completed ? " todo-app__item-text--done" : "")
              }
              onClick={() => toggleTodo(todo.id, todo.completed)}
            >
              {todo.title}
            </span>
            <button
              className="todo-app__del-btn"
              onClick={() => deleteTodo(todo.id)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
