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

  const baseEp = "http://localhost:5000/tasks";
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
      Hello world!
    </>
  )
}

export default App
