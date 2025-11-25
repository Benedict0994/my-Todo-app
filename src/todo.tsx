export type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoProps = {
  todo: TodoItem;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function Todo({ todo, onToggle, onDelete }: TodoProps) {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <button
        className="check-btn"
        aria-label={todo.completed ? "Mark active" : "Mark completed"}
        onClick={() => onToggle(todo.id)}
      >
        <span className="check-circle">{todo.completed ? "✓" : ""}</span>
      </button>

      <span className="todo-text" onClick={() => onToggle(todo.id)}>
        {todo.text}
      </span>

      <button className="delete-btn" aria-label="Delete todo" onClick={() => onDelete(todo.id)}>
        ✖
      </button>
    </li>
  );
}