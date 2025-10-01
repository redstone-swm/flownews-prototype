import React from 'react';

export function StatusBar() {
  return (
    <div className="h-[44px] relative shrink-0 w-[375px] flex items-center justify-between px-4">
      <div className="text-white text-sm font-semibold">
        9:41
      </div>
      <div className="flex items-center gap-1">
        <div className="w-4 h-2 border border-white rounded-sm"></div>
        <div className="w-3 h-3 bg-white rounded-full"></div>
        <div className="w-6 h-3 border border-white rounded-sm relative">
          <div className="w-1 h-1 bg-white rounded-sm absolute -right-1 top-1"></div>
        </div>
      </div>
    </div>
  );
}