
import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../types';
import { Trash, Edit, Save } from './Icons';

interface TodoItemProps {
  todo: Todo;
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  onEditTodo: (id: number, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleTodo, onDeleteTodo, onEditTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editText.trim()) {
      onEditTodo(todo.id, editText.trim());
    } else {
      setEditText(todo.text); // Reset if empty
    }
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  }

  return (
    <li className="flex items-center p-4 group transition-colors hover:bg-slate-800/50">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleTodo(todo.id)}
        className="h-5 w-5 rounded border-slate-600 text-cyan-500 bg-slate-700 focus:ring-cyan-600 cursor-pointer"
      />
      <div className="ml-4 flex-grow">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-b border-cyan-500 text-slate-200 outline-none"
          />
        ) : (
          <span
            className={`transition-all ${
              todo.completed ? 'text-slate-500 line-through' : 'text-slate-200'
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>
      <div className="flex items-center space-x-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
        {isEditing ? (
            <button onClick={handleSave} className="p-1 text-green-400 hover:text-green-300">
                <Save className="w-5 h-5" />
            </button>
        ) : (
            <button onClick={() => setIsEditing(true)} className="p-1 text-slate-400 hover:text-slate-200">
                <Edit className="w-5 h-5" />
            </button>
        )}
        <button onClick={() => onDeleteTodo(todo.id)} className="p-1 text-red-500 hover:text-red-400">
          <Trash className="w-5 h-5" />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
