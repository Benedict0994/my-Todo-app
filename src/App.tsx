import { useState } from "react";
import Todo, { type TodoItem } from "./todo";
import "./App.css";


export default function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    const newTodo: TodoItem = { id: Date.now(), text, completed: false };
    setTodos((s) => [...s, newTodo]);
    setInput("");
  };

  const toggleTodo = (id: number) =>
    setTodos((s) => s.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const deleteTodo = (id: number) => setTodos((s) => s.filter((t) => t.id !== id));

  const clearCompleted = () => setTodos((s) => s.filter((t) => !t.completed));

  const filtered = todos.filter((t) =>
    filter === "all" ? true : filter === "active" ? !t.completed : t.completed
  );

  return (
    <div className={`app ${theme}`}>
      <header className="hero">
        <h1 className="logo">T O D O</h1>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </header>

      <main className="center-wrapper">
        <div className="card">
          <div className="input-row">
            <div className="input-left-circle" />
            <input
              className="task-input"
              placeholder="Create a new todo..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
            />
          </div>
          </div>
          <div className="card list-card" style={{ marginTop: "24px" }}>
          <ul className="todo-list">
            {filtered.map((todo) => (
              <Todo key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
            ))}
          </ul>

          <div className="list-footer">
            <span className="items-left">{todos.filter((t) => !t.completed).length} items left</span>

            <div className="filters">
              <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All</button>
              <button className={`filter-btn ${filter === "active" ? "active" : ""}`} onClick={() => setFilter("active")}>Active</button>
              <button className={`filter-btn ${filter === "completed" ? "active" : ""}`} onClick={() => setFilter("completed")}>Completed</button>
            </div>

            <button className="clear-btn" onClick={clearCompleted}>Clear Completed</button>
          </div>
          </div>
        

        <p className="reorder-hint">Drag and drop to reorder list</p>
      </main>
    </div>
  );
}
