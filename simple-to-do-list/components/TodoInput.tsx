import React, { useState } from 'react';
import { Plus } from './Icons';

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTodo(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-b border-slate-700">
      <div className="relative">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="w-full bg-slate-900 border border-slate-700 rounded-md py-3 pl-4 pr-24 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
        />
        <div className="absolute inset-y-0 right-2 flex items-center">
          <button
            type="submit"
            disabled={!text.trim()}
            className="flex items-center justify-center px-4 py-2 bg-cyan-600 text-white rounded-md text-sm font-semibold hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default TodoInput;