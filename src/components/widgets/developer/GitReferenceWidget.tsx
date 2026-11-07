import React, { useState } from 'react';
import { GitBranch, Copy, Check, Search } from 'lucide-react';

interface GitCommand {
  cmd: string;
  desc: string;
  category: string;
}

const GIT_COMMANDS: GitCommand[] = [
  { cmd: 'git checkout -b <branch>', desc: 'Create & switch to new branch', category: 'Branches' },
  { cmd: 'git switch -', desc: 'Quickly switch to previous branch', category: 'Branches' },
  { cmd: 'git commit -am "feat: description"', desc: 'Stage tracked files & commit', category: 'Commits' },
  { cmd: 'git commit --amend --no-edit', desc: 'Amend previous commit without changing message', category: 'Commits' },
  { cmd: 'git reset --soft HEAD~1', desc: 'Undo last commit, keep changes staged', category: 'Undoing' },
  { cmd: 'git stash push -m "wip"', desc: 'Stash unstaged changes with memo', category: 'Stash' },
  { cmd: 'git stash pop', desc: 'Apply latest stash and drop from list', category: 'Stash' },
  { cmd: 'git log --oneline --graph --decorate', desc: 'Compact graphical commit history', category: 'Inspect' },
  { cmd: 'git diff --staged', desc: 'Show changes staged for next commit', category: 'Inspect' }
];

export const GitReferenceWidget: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const filtered = GIT_COMMANDS.filter(
    (c) => c.cmd.toLowerCase().includes(filter.toLowerCase()) || c.desc.toLowerCase().includes(filter.toLowerCase())
  );

  const copy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 1500);
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <GitBranch className="w-4 h-4 text-orange-400" />
            <span>Git Quick Reference</span>
          </div>
          <div className="relative w-32">
            <Search className="w-3 h-3 absolute left-1.5 top-2 text-slate-500" />
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search git..."
              className="w-full pl-6 pr-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-[11px] text-slate-200 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1.5 max-h-40 pr-1 mt-1">
        {filtered.map((item, i) => (
          <div
            key={i}
            onClick={() => copy(item.cmd)}
            className="p-1.5 rounded bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 cursor-pointer transition-colors flex items-center justify-between group"
          >
            <div className="truncate mr-2">
              <code className="text-orange-300 font-mono text-[11px] font-semibold">{item.cmd}</code>
              <p className="text-[10px] text-slate-400 mt-0.5 truncate">{item.desc}</p>
            </div>
            <button className="text-slate-500 group-hover:text-slate-300 p-1">
              {copiedCmd === item.cmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
