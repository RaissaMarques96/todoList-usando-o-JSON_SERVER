import { FormEvent, useEffect, useState } from "react";
import './style.scss'

type Todo = {
  id: number
  task: string
  done: boolean
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]> ([])
  const [task, setTask] = useState('')

  useEffect(() => {
    fetch ('http://localhost:3000/todos').then(data => data.json()).then(response => setTodos(response))
  }, [todos])

  function handleSubmit( event: FormEvent) {
    event.preventDefault()
    if (task.trim() !== '') {
      fetch ('http://localhost:3000/todos', {
        method: "POST",
        body: JSON.stringify({task, done:false})
      })
      setTask('')
    }
  }

  return (
    <div id="container">
      <form onSubmit={handleSubmit} id="form">
        <input type="text" value={task} onChange={event => setTask(event.target.value)} placeholder="Digite uma tarefa" />
        <button type="submit">Cadastrar</button>
      </form>
      {
        todos.map(todo => (
          <p>{todo.task}</p>
        ))
      }
    </div>
  )
}