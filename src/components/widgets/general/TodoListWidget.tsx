import React, { useState, useEffect } from 'react';
import { CheckSquare, Plus, Trash2, CheckCircle } from 'lucide-react';
import { StorageService } from '../../../services/storageService';
import { TodoItem } from '../../../types';

const STORAGE_KEY = 'personatab_todo_items';

const DEFAULT_TODOS: TodoItem[] = [
  { id: '1', text: 'Ship quarterly product update', completed: true, priority: 'high' },
  { id: '2', text: 'Clean up stale Git branches', completed: false, priority: 'medium' },
  { id: '3', text: 'Review team weekly goals', completed: false, priority: 'low' }
];

export const TodoListWidget: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newText, setNewText] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all');

  useEffect(() => {
    StorageService.getItem<TodoItem[]>(STORAGE_KEY, DEFAULT_TODOS).then(setTodos);
  }, []);

  const saveTodos = (updated: TodoItem[]) => {
    setTodos(updated);
    StorageService.setItem(STORAGE_KEY, updated);
  };

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const item: TodoItem = {
      id: Date.now().toString(),
      text: newText.trim(),
      completed: false,
      priority
    };

    saveTodos([item, ...todos]);
    setNewText('');
  };

  const toggleTodo = (id: string) => {
    saveTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    saveTodos(todos.filter((t) => t.id !== id));
  };

  const filtered = todos.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'done') return t.completed;
    return true;
  });

  const priorityColor = (p: TodoItem['priority']) => {
    switch (p) {
      case 'high': return 'text-rose-400 bg-rose-950/60 border-rose-800/60';
      case 'medium': return 'text-amber-400 bg-amber-950/60 border-amber-800/60';
      default: return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <CheckSquare className="w-4 h-4 text-emerald-400" />
            <span>Priority Task Checklist</span>
          </div>

          <div className="flex gap-1 text-[10px]">
            {(['all', 'active', 'done'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-1.5 py-0.5 rounded capitalize ${
                  filter === f ? 'bg-slate-700 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={addTodo} className="flex gap-1.5 mb-2">
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Add new task..."
            className="flex-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            className="px-1.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 text-[10px]"
          >
            <option value="high">High</option>
            <option value="medium">Med</option>
            <option value="low">Low</option>
          </select>
          <button
            type="submit"
            className="p-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center px-2 font-bold"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      <div className="space-y-1 flex-1 overflow-y-auto max-h-36 pr-1">
        {filtered.length === 0 ? (
          <div className="text-center py-4 text-slate-500 italic">No tasks in this view</div>
        ) : (
          filtered.map((t) => (
            <div
              key={t.id}
              onClick={() => toggleTodo(t.id)}
              className={`p-1.5 rounded flex items-center justify-between cursor-pointer border transition-colors group ${
                t.completed
                  ? 'bg-slate-950/40 border-slate-900 text-slate-500 line-through'
                  : 'bg-slate-900/60 border-slate-800 text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 truncate mr-2">
                <CheckCircle
                  className={`w-3.5 h-3.5 shrink-0 ${
                    t.completed ? 'text-emerald-400' : 'text-slate-600 group-hover:text-slate-400'
                  }`}
                />
                <span className="truncate">{t.text}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className={`px-1.5 py-0.2 rounded text-[9px] uppercase font-bold border ${priorityColor(t.priority)}`}>
                  {t.priority}
                </span>
                <button
                  onClick={(e) => deleteTodo(t.id, e)}
                  className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 p-0.5"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
