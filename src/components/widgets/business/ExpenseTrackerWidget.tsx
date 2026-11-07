import React, { useState, useEffect } from 'react';
import { Receipt, Plus, Trash2 } from 'lucide-react';
import { StorageService } from '../../../services/storageService';

interface ExpenseItem {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

const STORAGE_KEY = 'biz_expenses_list';

export const ExpenseTrackerWidget: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Software');

  useEffect(() => {
    StorageService.getItem<ExpenseItem[]>(STORAGE_KEY, [
      { id: '1', title: 'AWS Cloud Hosting', amount: 340, category: 'Infrastructure', date: 'Nov 04' },
      { id: '2', title: 'Figma Team Seat', amount: 45, category: 'Software', date: 'Nov 05' },
      { id: '3', title: 'Google Workspace', amount: 72, category: 'Operations', date: 'Nov 06' }
    ]).then(setExpenses);
  }, []);

  const addExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !amount) return;

    const newItem: ExpenseItem = {
      id: Date.now().toString(),
      title: title.trim(),
      amount: parseFloat(amount),
      category,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };

    const updated = [newItem, ...expenses];
    setExpenses(updated);
    StorageService.setItem(STORAGE_KEY, updated);
    setTitle('');
    setAmount('');
  };

  const removeExpense = (id: string) => {
    const updated = expenses.filter((ex) => ex.id !== id);
    setExpenses(updated);
    StorageService.setItem(STORAGE_KEY, updated);
  };

  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Receipt className="w-4 h-4 text-amber-400" />
            <span>Business Expenses</span>
          </div>
          <div className="font-mono tabular-nums text-right">
            <span className="text-[10px] text-slate-400 block">Total Outlay</span>
            <span className="text-sm font-bold text-amber-400">${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        <form onSubmit={addExpense} className="grid grid-cols-12 gap-1.5 mb-3">
          <input
            type="text"
            placeholder="Expense item (e.g. Stripe, Ads)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="col-span-5 px-2 py-1 rounded bg-slate-800/80 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="$"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="col-span-3 px-2 py-1 rounded bg-slate-800/80 border border-slate-700 text-slate-100 font-mono focus:outline-none"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="col-span-3 px-1.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 text-[11px]"
          >
            <option value="Software">Software</option>
            <option value="Marketing">Marketing</option>
            <option value="Infrastructure">Infra</option>
            <option value="Operations">Operations</option>
          </select>
          <button
            type="submit"
            className="col-span-1 flex items-center justify-center rounded bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 max-h-36 pr-1 font-mono">
        {expenses.length === 0 ? (
          <div className="text-center py-4 text-slate-500 italic">No expenses logged yet.</div>
        ) : (
          expenses.map((ex) => (
            <div
              key={ex.id}
              className="flex items-center justify-between p-1.5 rounded bg-slate-800/40 hover:bg-slate-800/70 border border-slate-800 transition-colors group"
            >
              <div className="truncate max-w-[150px]">
                <div className="text-slate-200 font-medium truncate">{ex.title}</div>
                <div className="text-[10px] text-slate-400">
                  {ex.category} · {ex.date}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-200">${ex.amount.toFixed(2)}</span>
                <button
                  onClick={() => removeExpense(ex.id)}
                  className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-opacity p-0.5"
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
