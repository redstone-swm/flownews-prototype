import React, { useState } from 'react';

interface TabNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const tabs = [
  { id: 'articles', label: '기사 모아보기' },
  { id: 'dashboard', label: '대시보드' },
  { id: 'profile', label: '내 정보' }
];

export function TabNavigation({ activeTab = 'articles', onTabChange }: TabNavigationProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[375px]">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <div 
            key={tab.id}
            className="basis-0 grow min-h-px min-w-px relative shrink-0 cursor-pointer"
            onClick={() => handleTabClick(tab.id)}
          >
            <div className="box-border content-stretch flex gap-[10px] items-center justify-center overflow-clip px-[28px] py-[12px] relative w-full">
              <p className={`font-sans font-semibold leading-[1.4] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-nowrap tracking-[-0.35px] whitespace-pre ${
                isActive ? 'text-[#111121]' : 'text-[#767676]'
              }`}>
                {tab.label}
              </p>
            </div>
            <div 
              aria-hidden="true" 
              className={`absolute border-solid inset-0 pointer-events-none ${
                isActive 
                  ? 'border-[#111121] border-[0px_0px_2px]' 
                  : 'border-[#d9dfe8] border-[0px_0px_1px]'
              }`} 
            />
          </div>
        );
      })}
    </div>
  );
}