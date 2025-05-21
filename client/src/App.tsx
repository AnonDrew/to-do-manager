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
    <>
      <div>
        <h1>To-do Manager</h1>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <button onClick={addTodo}>Add To-do</button>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <span
                style={{ textDecoration: todo.completed ? "line-through" : "" }}
                onClick={() => toggleTodo(todo.id, todo.completed)}
              >
                {todo.title}
              </span>
              <button onClick={() => deleteTodo(todo.id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
