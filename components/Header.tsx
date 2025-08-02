import React from 'react';
import { CheckSquare } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center space-x-3">
        <CheckSquare className="w-10 h-10 text-cyan-400" />
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-200 to-slate-400 text-transparent bg-clip-text">
          Todo List
        </h1>
      </div>
      <p className="mt-3 text-lg text-slate-400">A simple and effective task manager</p>
    </header>
  );
};

export default Header;