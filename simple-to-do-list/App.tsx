import React, { useState, useMemo, useCallback } from 'react';
import { Todo, FilterType } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<FilterType>('all');

  const addTodo = useCallback((text: string) => {
    if (text.trim() === '') return;
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
  }, [setTodos]);

  const toggleTodo = useCallback((id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, [setTodos]);

  const deleteTodo = useCallback((id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, [setTodos]);

  const editTodo = useCallback((id: number, newText: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  }, [setTodos]);
  
  const clearCompleted = useCallback(() => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  }, [setTodos]);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);
  
  const activeCount = useMemo(() => todos.filter(todo => !todo.completed).length, [todos]);

  return (
    <div className="min-h-screen flex flex-col items-center pt-8 sm:pt-16 px-4 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="w-full max-w-xl">
        <Header />
        <main className="mt-8 bg-slate-800/50 rounded-lg shadow-2xl backdrop-blur-sm border border-slate-700">
          <TodoInput onAddTodo={addTodo} />
          <TodoList
            todos={filteredTodos}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
            onEditTodo={editTodo}
          />
          {todos.length > 0 && (
             <TodoFilter 
                activeFilter={filter} 
                onSetFilter={setFilter} 
                activeCount={activeCount}
                onClearCompleted={clearCompleted}
                hasCompletedTodos={todos.some(t => t.completed)}
            />
          )}
        </main>
        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>Stay organized and productive.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;