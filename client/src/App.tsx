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

  const url = "http://localhost:5000/tasks";

  const getTodos = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      Hello world!
    </>
  )
}

export default App
