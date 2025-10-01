import React, { useState } from 'react';
import {Sparkles} from 'lucide-react';
import {ReactionBar} from '@/components/ui/reaction-bar';
import {NewsArticleReference} from '@/components/ui/news-article-reference';
import TopicStoryPage from './TopicStoryPage';

interface FollowButtonProps {
  isFollowing: boolean;
  onClick?: () => void;
}

const FollowButton: React.FC<FollowButtonProps> = ({ isFollowing, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        h-[30px] px-4 rounded-[30px] 
        shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)]
        font-medium text-[13px] tracking-[-0.26px]
        transition-colors duration-200
        ${isFollowing 
          ? 'bg-gray-50 text-gray-900 hover:bg-gray-100' 
          : 'bg-gray-900 text-gray-50 hover:bg-gray-800'
        }
      `}
    >
      {isFollowing ? '팔로잉' : '팔로우'}
    </button>
  );
};

interface TopicCardProps {
  title: string;
  description: string;
  isFollowing: boolean;
  isRecommended?: boolean;
  onFollowClick?: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ 
  title, 
  description, 
  isFollowing, 
  isRecommended = false,
  onFollowClick 
}) => {
  return (
    <div className="relative w-full">
      {/* 세로 타임라인 바 */}
      <div className="absolute left-5 top-[22px] w-0.5 h-[294px] bg-gray-300" />
      
      <div className="pl-[41px] pr-5 pt-[18px]">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-[44px]">
          <h2 className="text-[20px] font-medium text-gray-900 tracking-[-0.4px]">
            {title}
          </h2>
          
          <div className="flex items-center gap-2">
            {isRecommended && (
              <>
                <Sparkles className="w-6 h-6 text-gray-600" />
                <span className="text-[11px] font-medium text-gray-600 tracking-[-0.22px]">
                  추천됨
                </span>
              </>
            )}
            <FollowButton isFollowing={isFollowing} onClick={onFollowClick} />
          </div>
        </div>
        
        {/* 이미지 플레이스홀더 */}
        <div className="w-full h-[200px] bg-[#d9d9d9] rounded-[20px] mb-4" />
        
        {/* 설명 */}
        <p className="text-[14px] font-medium text-black tracking-[-0.28px] leading-normal">
          {description}
        </p>
      </div>
    </div>
  );
};

interface EventCardProps {
  title: string;
  description: string;
  time: string;
  reactions: {
    heartCount: number;
    angryCount: number;
    activeReaction?: "heart" | "angry" | null;
  };
  onClick?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ title, description, time, reactions, onClick }) => {
  return (
    <div className="pl-[41px] pr-5 cursor-pointer" onClick={onClick}>
      {/* 이벤트 내용 */}
      <div className="mb-[25px]">
        <div className="flex items-start justify-between mb-[10px]">
          <h3 className="text-[16px] font-medium text-gray-900 tracking-[-0.32px] flex-1">
            {title}
          </h3>
          <span className="text-[12px] font-medium text-gray-700 tracking-[-0.24px] whitespace-nowrap ml-2">
            {time}
          </span>
        </div>
        <p className="text-[14px] font-medium text-black tracking-[-0.28px] leading-normal">
          {description}
        </p>
      </div>

      {/* 뉴스 기사 참조 */}
      <div className="mb-[11px]">
        <NewsArticleReference
          source="연합뉴스"
          date="2025.01.01"
          title="기사 이름"
          sourceBgColor="bg-gray-500"
          link="#"
          className="w-full max-w-none"
        />
      </div>

      {/* 리액션 바 */}
      <ReactionBar reactions={reactions} className="bg-transparent p-0 h-auto" />
    </div>
  );
};

const TimelineLink: React.FC = () => {
  return (
    <div className="pl-5 py-[6px] flex items-center">
      {/* 점들 */}
      <div className="flex flex-col gap-[6px] mr-[20px]">
        <div className="w-0.5 h-0.5 bg-gray-400 rounded-full" />
        <div className="w-0.5 h-0.5 bg-gray-400 rounded-full" />
        <div className="w-0.5 h-0.5 bg-gray-400 rounded-full" />
        <div className="w-0.5 h-0.5 bg-gray-400 rounded-full" />
      </div>
      <button className="text-[15px] font-medium text-[#009e91] tracking-[-0.3px] hover:underline">
        타임라인 보기
      </button>
    </div>
  );
};

const BottomNavigation: React.FC = () => {
  const navItems = [
    { icon: "🏠", label: "홈" },
    { icon: "🔍", label: "검색" },
    { icon: "📊", label: "통계" },
    { icon: "⚙️", label: "설정" }
  ];

  return (
    <div className="bg-gray-50 border-t border-gray-300 px-5 py-[26px]">
      <div className="flex justify-between items-center max-w-[332px] mx-auto">
        {navItems.map((item, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center w-6 h-6 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label={item.label}
          >
            <span className="text-lg">{item.icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const TopNavBar: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-5 py-2 h-[61px] bg-white">
      {/* 로고 */}
      <div className="flex items-center gap-5">
        <div className="w-[45px] h-9 flex items-center justify-center">
          <span className="text-xl font-bold text-[#009e91]">차집</span>
        </div>
        
        {/* 프로필 */}
        <div className="w-[30px] h-[30px] rounded-full bg-gray-300 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500" />
        </div>
      </div>
    </div>
  );
};

const mockStories = [
  {
    id: "1",
    title: "오봉저수지의 저수율 14.9% 붕괴",
    content: "31일 강원 강릉시 오봉저수지 일대가 최악의 가뭄으로 바닥이 드러나 있다.",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    reactions: {
      heart: "1K",
      angry: "1K", 
      sad: "1K",
      stats: "20K"
    }
  },
  {
    id: "2",
    title: "가뭄으로 인한 농작물 피해 확산",
    content: "전국 각지에서 가뭄으로 인한 농작물 피해가 속출하고 있으며, 정부 차원의 대응이 시급한 상황이다.",
    imageUrl: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=250&fit=crop",
    reactions: {
      heart: "2K",
      angry: "500",
      sad: "800", 
      stats: "15K"
    }
  }
];

const FeedPage: React.FC = () => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  
  const mockReactions = {
    heartCount: 1000,
    angryCount: 1000,
    activeReaction: null as "heart" | "angry" | null,
  };

  const openStory = (index: number) => {
    setSelectedStoryIndex(index);
  };

  const closeStory = () => {
    setSelectedStoryIndex(null);
  };

  const nextStory = () => {
    setSelectedStoryIndex((i) => 
      (i === null ? null : (i + 1) % mockStories.length)
    );
  };

  const prevStory = () => {
    setSelectedStoryIndex((i) => 
      (i === null ? null : i === 0 ? mockStories.length - 1 : i - 1)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full max-w-[412px] mx-auto relative">
      {/* 상단 네비게이션 */}
      <TopNavBar />
      
      {/* 메인 콘텐츠 */}
      <div className="pb-[75px]">
        {/* 첫 번째 토픽 */}
        <div className="border-b border-gray-300">
          <TopicCard
            title="2025년 강릉 가뭄"
            description="역대 최악의 가뭄 사태, 대처 및 현황은 어떻게 되고 있을까?"
            isFollowing={true}
          />
        </div>

        {/* 이벤트 */}
        <div className="py-5">
          <EventCard
            title="오봉저수지의 저수율 14.9% 붕괴"
            description="31일 강원 강릉시 오봉저수지 일대가 최악의 가뭄으로 바닥이 드러나 있다."
            time="어제 07:00"
            reactions={mockReactions}
            onClick={() => openStory(0)}
          />
        </div>

        {/* 타임라인 링크 */}
        <TimelineLink />

        {/* 구분선 */}
        <div className="h-px bg-gray-300" />

        {/* 두 번째 토픽 */}
        <div className="mt-5">
          <TopicCard
            title="백종원 논란"
            description="최근 들어 밝혀진 여러 논란들, 과연 어떻게 진행되고 있을까?"
            isFollowing={false}
            isRecommended={true}
          />
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <div className="absolute bottom-0 left-0 right-0">
        <BottomNavigation />
      </div>

      {/* 스토리 뷰어 */}
      {selectedStoryIndex !== null && (
        <div className="fixed inset-0 z-50">
          <TopicStoryPage 
            stories={mockStories}
            currentIndex={selectedStoryIndex}
            onClose={closeStory}
            onNext={nextStory}
            onPrev={prevStory}
          />
        </div>
      )}
    </div>
  );
};

export default FeedPage;