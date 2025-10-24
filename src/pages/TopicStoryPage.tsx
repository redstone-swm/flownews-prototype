import React from 'react';
import {ChevronLeft, ChevronRight, X} from 'lucide-react';
import {ReactionBar} from "@/components/ui";
import {mockStories} from '@/data/mockStories';
import {mockReactions} from '@/data/mockReactions';

// i18n 상수
const TEXTS = {
  CLOSE_STORY: '스토리 닫기',
  PREVIOUS_STORY: '이전 스토리',
  NEXT_STORY: '다음 스토리',
  STORY_CONTENT: '스토리 콘텐츠'
} as const;


interface TopicStoryPageProps {
  stories?: typeof mockStories;
  currentIndex?: number;
  onClose?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const TopicStoryPage: React.FC<TopicStoryPageProps> = ({
  stories = mockStories,
  currentIndex = 0,
  onClose,
  onNext,
  onPrev
}) => {
  const [internalIndex, setInternalIndex] = React.useState(currentIndex);
  const activeIndex = currentIndex !== undefined ? currentIndex : internalIndex;
  const currentStory = stories[activeIndex];

  const goToNext = () => {
    if (onNext) {
      onNext();
    } else {
      setInternalIndex((prev) => (prev + 1) % stories.length);
    }
  };

  const goToPrevious = () => {
    if (onPrev) {
      onPrev();
    } else {
      setInternalIndex((prev) => (prev - 1 + stories.length) % stories.length);
    }
  };


  return (
    <div className="bg-black relative w-full h-screen overflow-hidden">
      {/* 닫기 버튼 */}
      <button 
        className="absolute left-4 sm:left-6 md:left-8 top-4 sm:top-6 md:top-8 z-20 
                   text-white hover:text-zinc-300 transition-colors duration-200
                   p-2 rounded-full hover:bg-white/10 focus:outline-none 
                   focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        onClick={onClose}
        aria-label={TEXTS.CLOSE_STORY}
        type="button"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* 메인 이미지 */}
      <div className="relative w-full h-screen">
        <div 
          className="absolute inset-0 bg-center bg-cover bg-no-repeat
                     sm:top-16 sm:bottom-32 sm:left-4 sm:right-4 sm:rounded-2xl overflow-hidden
                     md:top-20 md:bottom-40 md:left-8 md:right-8 md:rounded-3xl
                     lg:top-24 lg:bottom-48 lg:left-16 lg:right-16
                     xl:max-w-4xl xl:mx-auto xl:left-auto xl:right-auto"
          style={{ backgroundImage: `url('${currentStory.imageUrl}')` }}
          role="img"
          aria-label={currentStory.title}
        />
        
        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 
                        bg-gradient-to-t from-black via-black/60 to-transparent
                        sm:bottom-32 sm:left-4 sm:right-4 sm:rounded-b-2xl
                        md:bottom-40 md:left-8 md:right-8 md:rounded-b-3xl
                        lg:bottom-48 lg:left-16 lg:right-16
                        xl:max-w-4xl xl:mx-auto xl:left-auto xl:right-auto" />
      </div>

      {/* 네비게이션 버튼 */}
      <button 
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 
                   text-white hover:text-zinc-300 transition-all duration-200
                   p-3 rounded-full hover:bg-white/20 backdrop-blur-sm
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-white
                   disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent
                   md:left-8 lg:left-12"
        onClick={goToPrevious}
        disabled={activeIndex === 0}
        aria-label={TEXTS.PREVIOUS_STORY}
        type="button"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>
      
      <button 
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 
                   text-white hover:text-zinc-300 transition-all duration-200
                   p-3 rounded-full hover:bg-white/20 backdrop-blur-sm
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-white
                   disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent
                   md:right-8 lg:right-12"
        onClick={goToNext}
        disabled={activeIndex >= stories.length - 1}
        aria-label={TEXTS.NEXT_STORY}
        type="button"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* 스토리 인디케이터 */}
      <div className="absolute top-16 sm:top-20 md:top-24 left-1/2 -translate-x-1/2 z-10">
        <div className="flex gap-1.5" role="tablist" aria-label="스토리 진행 상황">
          {stories.map((_story, index) => (
            <div
              key={index}
              className={`h-0.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-8 bg-white'
                  : 'w-4 bg-white/40'
              }`}
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`스토리 ${index + 1}/${stories.length}`}
            />
          ))}
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        {/* 설명 */}
        <section 
          className="px-4 sm:px-6 md:px-8 lg:px-12 pb-4 sm:pb-6 text-white
                     max-w-4xl mx-auto"
          aria-label={TEXTS.STORY_CONTENT}
        >
          <header className="mb-4 sm:mb-6">
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold 
                          tracking-tight leading-tight mb-3 sm:mb-4">
              {currentStory.title}
            </h1>
          </header>
          
          <div className="text-sm sm:text-base md:text-lg text-zinc-200 
                         leading-relaxed line-clamp-3 sm:line-clamp-none">
            <p>{currentStory.content}</p>
          </div>
        </section>

        {/* 리액션 바 */}
        <footer className="px-4 sm:px-6 md:px-8 lg:px-12 pb-6 sm:pb-8">
          <div className="max-w-4xl mx-auto">
            <ReactionBar 
              eventId={0}
              topicId={0}
              isFollowing={false}
              reactions={mockReactions} 
              className="bg-black/40 backdrop-blur-md border-white/20"
            />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default TopicStoryPage;