import React, { useState } from 'react';
import { Hash, Copy, Check } from 'lucide-react';

const TAG_GROUPS: Record<string, string[]> = {
  YouTube: ['#creatoreconomy', '#videoediting', '#youtubeautomation', '#contentcreator', '#storytelling'],
  Instagram: ['#reelsvideo', '#visualstorytelling', '#creativelife', '#behindthescenes', '#indiefounder'],
  Tech: ['#softwaredeveloper', '#buildinpublic', '#webdev', '#codinglife', '#saasjourney']
};

export const HashtagsWidget: React.FC = () => {
  const [platform, setPlatform] = useState<string>('YouTube');
  const [copied, setCopied] = useState(false);

  const tags = TAG_GROUPS[platform] || [];

  const copyTags = () => {
    navigator.clipboard.writeText(tags.join(' '));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full text-xs">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Hash className="w-4 h-4 text-amber-400" />
            <span>Hashtag & Caption Helper</span>
          </div>
          <button
            onClick={copyTags}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="Copy tags"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="flex gap-1 mb-2 bg-slate-900 p-1 rounded-lg border border-slate-800">
          {Object.keys(TAG_GROUPS).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`flex-1 py-1 rounded text-center font-medium transition-colors ${
                platform === p ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 p-2 rounded-lg bg-slate-950 border border-slate-800/80">
        {tags.map((t) => (
          <span key={t} className="px-2 py-0.5 rounded bg-slate-900 text-amber-300 font-mono text-[11px]">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};
