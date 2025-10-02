import { useState } from 'react';

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
    <div className="flex items-center relative w-full bg-white shadow-sm border-b border-gray-100">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <div 
            key={tab.id}
            className="flex-1 relative cursor-pointer"
            onClick={() => handleTabClick(tab.id)}
          >
            <div className="flex items-center justify-center px-[16px] sm:px-[24px] md:px-[28px] py-[12px] w-full transition-all duration-200 hover:bg-gray-50">
              <p className={`font-sans font-semibold leading-[1.4] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] sm:text-[13px] md:text-[14px] text-nowrap tracking-[-0.35px] whitespace-pre transition-colors duration-200 ${
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