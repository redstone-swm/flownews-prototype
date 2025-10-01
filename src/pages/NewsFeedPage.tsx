import React, { useState, useEffect } from 'react';
import { Heart, Bell } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import TopicStoryPage from './TopicStoryPage';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  published_at: string;
  category: string;
  image_url: string;
  read_time: string;
}

interface StoryContent {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  reactions: {
    heart: string;
    angry: string;
    sad: string;
    stats: string;
  };
}

const mockNewsData: NewsArticle[] = [
  {
    id: "1",
    title: "오봉저수지의 저수율 14.9% 붕괴",
    summary: "31일 강원 강릉시 오봉저수지 일대가 최악의 가뭄으로 바닥이 드러나 있다.",
    source: "연합뉴스",
    published_at: "2시간 전",
    category: "사회",
    image_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    read_time: "2분"
  },
  {
    id: "2", 
    title: "기후변화로 인한 극심한 가뭄 피해 확산",
    summary: "전국 각지에서 가뭄으로 인한 농작물 피해가 속출하고 있다.",
    source: "KBS뉴스",
    published_at: "4시간 전",
    category: "환경",
    image_url: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=250&fit=crop",
    read_time: "3분"
  },
  {
    id: "3",
    title: "정부, 가뭄 대응 특별대책 발표",
    summary: "농림축산식품부가 가뭄 피해 최소화를 위한 긴급 대응책을 내놨다.",
    source: "MBC뉴스",
    published_at: "6시간 전",
    category: "정치",
    image_url: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=250&fit=crop",
    read_time: "4분"
  }
];

const mockStoryData: StoryContent[] = [
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
    title: "기후변화로 인한 극심한 가뭄 피해 확산",
    content: "전국 각지에서 가뭄으로 인한 농작물 피해가 속출하고 있으며, 정부 차원의 대응이 시급한 상황이다.",
    imageUrl: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=250&fit=crop",
    reactions: {
      heart: "2K",
      angry: "500",
      sad: "800",
      stats: "15K"
    }
  },
  {
    id: "3",
    title: "정부, 가뭄 대응 특별대책 발표",
    content: "농림축산식품부가 가뭄 피해 최소화를 위한 긴급 대응책을 내놓았으며, 지원금 확대 방안을 검토 중이다.",
    imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=250&fit=crop",
    reactions: {
      heart: "1.5K",
      angry: "300",
      sad: "600",
      stats: "12K"
    }
  }
];

const StoryViewer: React.FC<{
  stories: StoryContent[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ stories, currentIndex, onClose, onNext, onPrev }) => {
  return (
    <div className="fixed inset-0 z-50">
      <TopicStoryPage 
        stories={stories}
        currentIndex={currentIndex}
        onClose={onClose}
        onNext={onNext}
        onPrev={onPrev}
      />
    </div>
  );
};

function NewsFeedPage() {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const [storyData, setStoryData] = useState<StoryContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Mock data loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        setNewsData(mockNewsData);
        setStoryData(mockStoryData);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const openStory = (index: number) => {
    // 픽셀 이벤트 호출
    if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
      (window as any).fbq('track', 'ViewContent', {
        content_type: 'feed',
        content_id: newsData[index]?.id,
        title: newsData[index]?.title,
      });
    }
    setSelectedStoryIndex(index);
  };

  const closeStory = () => setSelectedStoryIndex(null);
  
  const nextStory = () => setSelectedStoryIndex((i) => 
    (i === null ? null : (i + 1) % storyData.length)
  );
  
  const prevStory = () => setSelectedStoryIndex((i) => 
    (i === null ? null : i === 0 ? storyData.length - 1 : i - 1)
  );

  if (isLoading) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-2"></div>
          <p className="text-gray-500 text-sm">뉴스를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] overflow-y-auto scrollbar-hide">
      <div className="space-y-3">
        {newsData.map((news, index) => (
          <Card
            key={news.id}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow flex-shrink-0"
            onClick={() => openStory(index)}
          >
            <div className="flex items-center p-3 border-b">
              <Avatar className="w-8 h-8 mr-3">
                <AvatarFallback>{news.source[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-sm">{news.source}</p>
                <p className="text-xs text-gray-500">{news.published_at}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {news.category}
              </Badge>
            </div>

            <div className="relative">
              <img
                src={news.image_url}
                alt={news.title}
                className="w-full aspect-[2/1] object-cover"
              />
            </div>

            <CardContent className="p-3">
              <h3 className="font-bold text-sm mb-2 line-clamp-2">{news.title}</h3>
              <p className="text-gray-600 text-xs mb-3 line-clamp-2">{news.summary}</p>

              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500">
                    <Heart className="w-4 h-4" />
                    <span className="text-xs">좋아요</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-teal-500">
                    <Bell className="w-4 h-4" />
                    <span className="text-xs">알림</span>
                  </button>
                </div>
                <span className="text-xs text-gray-400">{news.read_time}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 스토리 뷰어 */}
      {selectedStoryIndex !== null && storyData.length > 0 && (
        <StoryViewer
          stories={storyData}
          currentIndex={selectedStoryIndex}
          onClose={closeStory}
          onNext={nextStory}
          onPrev={prevStory}
        />
      )}
    </div>
  );
}

export default NewsFeedPage;