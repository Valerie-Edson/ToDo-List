
import React from 'react';
import { FilterType } from '../types';

interface TodoFilterProps {
  activeFilter: FilterType;
  onSetFilter: (filter: FilterType) => void;
  activeCount: number;
  onClearCompleted: () => void;
  hasCompletedTodos: boolean;
}

const FilterButton: React.FC<{
  filterType: FilterType;
  activeFilter: FilterType;
  onClick: (filter: FilterType) => void;
  children: React.ReactNode;
}> = ({ filterType, activeFilter, onClick, children }) => {
  const isActive = activeFilter === filterType;
  return (
    <button
      onClick={() => onClick(filterType)}
      className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
        isActive
          ? 'text-cyan-400'
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
      }`}
    >
      {children}
    </button>
  );
};

const TodoFilter: React.FC<TodoFilterProps> = ({
  activeFilter,
  onSetFilter,
  activeCount,
  onClearCompleted,
  hasCompletedTodos,
}) => {
  return (
    <div className="flex items-center justify-between p-4 text-sm text-slate-400 border-t border-slate-700">
      <span>{activeCount} item{activeCount !== 1 ? 's' : ''} left</span>
      <div className="hidden sm:flex items-center space-x-2">
        <FilterButton filterType="all" activeFilter={activeFilter} onClick={onSetFilter}>
          All
        </FilterButton>
        <FilterButton filterType="active" activeFilter={activeFilter} onClick={onSetFilter}>
          Active
        </FilterButton>
        <FilterButton filterType="completed" activeFilter={activeFilter} onClick={onSetFilter}>
          Completed
        </FilterButton>
      </div>
      <button
        onClick={onClearCompleted}
        className={`hover:text-white transition-colors ${
          hasCompletedTodos ? 'opacity-100' : 'opacity-0 cursor-default'
        }`}
        disabled={!hasCompletedTodos}
      >
        Clear completed
      </button>
    </div>
  );
};

export default TodoFilter;
