import React, { useState } from 'react';

interface Category {
  id: string;
  label: string;
  icon: string;
  isActive?: boolean;
}

interface CategoryFilterProps {
  categories?: Category[];
  onCategoryChange?: (categoryId: string) => void;
}

const defaultCategories: Category[] = [
  { id: 'interest', label: '관심 토픽', icon: '⭐', isActive: true },
  { id: 'economy', label: '경제', icon: '📈' },
  { id: 'sports', label: '스포츠', icon: '⚽' },
  { id: 'health', label: '건강', icon: '🏥' },
  { id: 'game', label: '게임', icon: '🎮' },
  { id: 'daily', label: '일상', icon: '📅' },
  { id: 'daily2', label: '일상2', icon: '📅' }
];

export function CategoryFilter({ categories = defaultCategories, onCategoryChange }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState(
    categories.find(cat => cat.isActive)?.id || categories[0]?.id
  );

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onCategoryChange?.(categoryId);
  };

  return (
    <div className="bg-white box-border content-stretch flex gap-[8px] items-center pl-[12px] pr-0 py-[12px] relative shrink-0 w-full overflow-x-auto">
      {categories.map((category) => {
        const isSelected = selectedCategory === category.id;
        const isInterest = category.id === 'interest';
        
        return (
          <div 
            key={category.id}
            className={`bg-white box-border content-stretch flex gap-[6px] items-center px-[8px] py-[6px] relative rounded-[20px] shrink-0 cursor-pointer ${
              isSelected && !isInterest ? 'shadow-sm' : ''
            }`}
            onClick={() => handleCategoryClick(category.id)}
          >
            <div 
              aria-hidden="true" 
              className={`absolute border border-solid inset-0 pointer-events-none rounded-[20px] ${
                isInterest ? 'border-[#2e51bf]' : 'border-[rgba(0,0,0,0.1)]'
              }`} 
            />
            
            {!isInterest && (
              <div className="bg-[#eef0f3] overflow-clip relative rounded-[20px] shrink-0 size-[24px] flex items-center justify-center">
                <span className="text-[12px]">{category.icon}</span>
              </div>
            )}
            
            {isInterest && (
              <div className="relative shrink-0 size-[24px] flex items-center justify-center">
                <span className="text-[12px]">{category.icon}</span>
              </div>
            )}
            
            <p className={`font-sans font-semibold leading-[1.4] not-italic relative shrink-0 text-[14px] text-nowrap tracking-[-0.35px] whitespace-pre ${
              isInterest ? 'text-[#2e51bf]' : 'text-[#111121]'
            }`}>
              {category.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}