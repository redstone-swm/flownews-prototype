import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import heartIcon from '/assets/heart.svg';

// Mock data - replace with actual API calls
const mockTopics = [
  {
    id: '1',
    name: '2025년 뉴진스 활동',
    articles: [
      {
        id: 1,
        date: '2025년 9월 23일',
        time: '오전 11:16',
        title: '뉴진스가 새로운 앨범(어텐션) 발표',
        subtitle: '에이티즈 일본 정규 2집·FT아일랜드 일본 정규 10집 발표',
        content: "걸그룹 뉴진스(NewJeans)가 새로운 앨범 Attention을 발표했습니다. 이번 앨범은 뉴진스 특유의 청량하고 자유로운 감성을 담아내",
        image: 'https://picsum.photos/240/160?random=1',
        likes: 841,
        isLiked: true
      },
      {
        id: 2,
        date: '2025년 9월 23일',
        time: '오전 11:16',
        title: '뉴진스, 컴백 쇼케이스 개최…신곡 무대 최초 공개',
        subtitle: '에이티즈 일본 정규 2집·FT아일랜드 일본 정규 10집 발표',
        content: '뉴진스는 앨범 발매 이틀 뒤, 서울에서 열린 컴백 쇼케이스를 통해 신곡 무대를 최초로 공개했다. 현장에는 수천 명의 팬이 모였으며, 온라인 생중계 역시 높은 조회수를 기록했다. 멤버들은 "팬들과 직접 만날 수 있어 뜻깊다"며 소감을 전했다.',
        image: 'https://picsum.photos/240/160?random=3',
        likes: 840,
        isLiked: false
      },
      {
        id: 3,
        date: '2025년 9월 23일',
        time: '오전 11:16',
        title: '뉴진스, 빌보드 메인 차트 진입…케이팝 돌풍 이어간다',
        subtitle: '에이티즈 일본 정규 2집·FT아일랜드 일본 정규 10집 발표',
        content: '뉴진스의 신곡 Attention은 발매 직후 미국 빌보드 메인 차트에 진입하며 해외 팬들의 폭발적인 반응을 입증했다. 업계 관계자는 "뉴진스가 글로벌 케이팝 대표 주자로 자리매김했다"고 평가했다.',
        image: 'https://picsum.photos/240/160?random=5',
        likes: 840,
        isLiked: false
      }
    ]
  }
];

export default function TopicDetailPage() {
  const { topicId } = useParams({ from: '/topics/$topicId/' });
  const navigate = useNavigate();
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);

  console.log('TopicDetailPage - Received topicId:', topicId);

  const topic = mockTopics.find(t => t.id === topicId) || mockTopics[0];
  console.log('TopicDetailPage - Found topic:', topic);
  const currentArticle = topic.articles[currentArticleIndex];
  const totalArticles = topic.articles.length;

  // Navigation functions
  const goToNextArticle = () => {
    if (currentArticleIndex < totalArticles - 1) {
      setCurrentArticleIndex(currentArticleIndex + 1);
    }
  };

  const goToPrevArticle = () => {
    if (currentArticleIndex > 0) {
      setCurrentArticleIndex(currentArticleIndex - 1);
    }
  };

  // Touch/Swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNextArticle();
    } else if (isRightSwipe) {
      goToPrevArticle();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevArticle();
      } else if (e.key === 'ArrowRight') {
        goToNextArticle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentArticleIndex, totalArticles]);

  const goBack = () => {
    navigate({ to: '/' });
  };

  const handleLike = () => {
    console.log('Like article:', currentArticle.id);
  };

  const handleAddToInterest = () => {
    console.log('Add to interest:', topic.id);
  };

  return (
    <div
      className="fixed inset-0 overflow-clip"
      style={{
        background: 'linear-gradient(180deg, #323B86 0%, #3A2B7D 25%, #3A2A7C 50%, #3F1F76 100%)'
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute content-stretch flex flex-col items-start left-1/2 top-0 translate-x-[-50%] w-[375px] h-full">
        {/* Header */}
        <div className="border-[0px_0px_1px] border-[rgba(0,0,0,0.05)] border-solid h-[52px] relative shrink-0 w-full">
          <div className="h-[52px] overflow-clip relative w-full">
            <div className="absolute box-border content-stretch flex gap-[2px] items-center justify-end leading-[1.4] not-italic px-[4px] py-0 right-[12px] text-[14px] text-nowrap top-1/2 tracking-[-0.35px] translate-y-[-50%] whitespace-pre">
              <p className="font-semibold relative shrink-0 text-white">
                {currentArticleIndex + 1}
              </p>
              <p className="font-normal relative shrink-0 text-[rgba(255,255,255,0.5)]">
                /
              </p>
              <p className="font-normal relative shrink-0 text-[rgba(255,255,255,0.5)]">
                {totalArticles}
              </p>
            </div>
            <div className="absolute content-stretch flex gap-[2px] items-center left-[12px] top-1/2 translate-y-[-50%]">
              <button
                onClick={goBack}
                className="relative shrink-0 size-[28px] flex items-center justify-center"
              >
                <div className="flex items-center justify-center">
                  <div className="h-[5.923px] rotate-[90deg] w-[11px]">
                    <svg width="11" height="6" viewBox="0 0 11 6" fill="none">
                      <path d="M1 1L5.5 5L10 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </button>
              <div className="bg-[rgba(255,255,255,0.3)] border border-[rgba(255,255,255,0.3)] border-solid box-border content-stretch flex font-semibold gap-[6px] h-[36px] items-center leading-[1.4] not-italic px-[12px] py-[6px] relative rounded-[20px] shrink-0 text-[12px] text-nowrap tracking-[-0.3px] whitespace-pre">
                <p className="overflow-ellipsis overflow-hidden relative shrink-0 text-[#6ce9a6]">
                  #
                </p>
                <p className="overflow-ellipsis overflow-hidden relative shrink-0 text-white">
                  {topic.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-0 h-[34px] left-1/2 translate-x-[-50%] w-[375px]">
        <div className="absolute bottom-[8px] flex h-[5px] items-center justify-center translate-x-[-50%] w-[144px]" style={{ left: "calc(50% + 0.5px)" }}>
          <div className="flex-none rotate-[180deg] scale-y-[-100%]">
            <div className="bg-[rgba(255,255,255,0.5)] h-[5px] rounded-[100px] w-[144px]" />
          </div>
        </div>
      </div>

      {/* Progress Line */}
      <div 
        className="absolute bg-[rgba(255,255,255,0.3)] h-[2px] top-[153px] w-[685px] transition-all duration-500 ease-in-out"
        style={{
          right: currentArticleIndex === totalArticles - 1 ? '192px' : 'auto',
          left: currentArticleIndex === 0 
            ? '192px' 
            : currentArticleIndex === totalArticles - 1 
              ? 'auto' 
              : '50%',
          transform: currentArticleIndex === 0 || currentArticleIndex === totalArticles - 1 
            ? 'none' 
            : 'translateX(-50%)'
        }}
      />

      {/* Article Content */}
      <div className="absolute content-stretch flex flex-col gap-[12px] items-center left-1/2 translate-x-[-50%] top-[120px]">
        <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0">
          <div className="content-stretch flex gap-[4px] items-end justify-center relative shrink-0 w-full">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
              <p className="font-semibold leading-[1.4] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[-0.35px] whitespace-pre">
                {currentArticle.date}
              </p>
            </div>
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
              <p className="font-semibold leading-[1.4] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[-0.35px] whitespace-pre">
                {currentArticle.time}
              </p>
            </div>
          </div>
          <div className="relative shrink-0 size-[20px]">
            <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </div>
        </div>

        <div className="bg-[#f7f7f7] box-border content-stretch flex flex-col h-[560px] items-start justify-between min-h-[480px] overflow-clip pb-0 pt-[16px] px-0 relative rounded-[20px] shrink-0 w-[335px]">
          <div className="box-border content-stretch flex flex-col gap-[12px] items-start px-[16px] py-0 relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                <p className="-webkit-box basis-0 font-bold grow leading-[1.4] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#111121] text-[18px] tracking-[-0.45px]" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {currentArticle.title}
                </p>
              </div>
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                <p className="basis-0 font-normal grow leading-[1.4] min-h-px min-w-px not-italic relative shrink-0 text-[#767676] text-[12px] tracking-[-0.3px]">
                  {currentArticle.subtitle}
                </p>
              </div>
            </div>

            <div className="content-stretch flex gap-[6px] items-start relative shrink-0 w-[240px]">
              <div className="bg-[#f7f7f7] border border-[rgba(0,0,0,0.05)] border-solid h-[160px] relative rounded-[4px] shrink-0 w-[240px]">
                <div className="h-[160px] overflow-clip relative w-[240px]">
                  <div className="absolute aspect-[793/512] bottom-0 top-0 translate-x-[-50%]" style={{ left: "calc(50% - 0.5px)" }}>
                    <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={currentArticle.image} />
                  </div>
                </div>
              </div>
            </div>

            <div className="-webkit-box font-normal leading-[1.6] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#767676] text-[14px] tracking-[-0.35px]" style={{ width: "min-content" }}>
              <div className="whitespace-pre-wrap">
                {currentArticle.content}
              </div>
            </div>
          </div>

          <div className="bg-[#f7f7f7] box-border content-stretch flex gap-[10px] items-start pb-[16px] pt-[8px] px-[16px] relative shrink-0 w-full">
            <div className="bg-white border border-[rgba(0,0,0,0.1)] border-solid box-border content-stretch flex gap-[4px] h-[44px] items-center justify-center px-[12px] py-[8px] relative rounded-[10px] shrink-0 w-[72px]">
              <button
                onClick={handleLike}
                className="block cursor-pointer overflow-clip relative shrink-0 size-[20px]"
              >
                <div className="absolute inset-[12.5%_9.38%]">
                  <img
                    alt=""
                    className="block max-w-none size-full"
                    src={heartIcon}
                    style={{
                      filter: currentArticle.isLiked ? 'brightness(0) saturate(100%) invert(25%) sepia(95%) saturate(7471%) hue-rotate(347deg) brightness(95%) contrast(86%)' : 'none'
                    }}
                  />
                </div>
              </button>
              <p className={`font-semibold leading-[1.4] not-italic relative shrink-0 text-[12px] text-nowrap tracking-[-0.3px] whitespace-pre ${
                currentArticle.isLiked ? 'text-[#eb6262]' : 'text-[#999999]'
              }`}>
                {currentArticle.likes}
              </p>
            </div>
            <button
              onClick={handleAddToInterest}
              className="basis-0 bg-[#2e51bf] box-border content-stretch flex gap-[4px] grow h-[44px] items-center justify-center min-h-px min-w-px px-[12px] py-[8px] relative rounded-[10px] shrink-0"
            >
              <div className="relative shrink-0 size-[20px]">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4.5V15.5M4.5 10H15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="font-semibold leading-[1.4] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[-0.35px] whitespace-pre">
                관심 토픽에 추가
              </p>
            </button>
          </div>
          <div className="absolute bottom-[68px] h-[111px] left-1/2 translate-x-[-50%] w-[335px]">
            <div className="absolute bg-gradient-to-b from-[rgba(247,247,247,0)] inset-0 to-[#f7f7f7]" />
          </div>
        </div>
      </div>


      {/* Progress Dots Indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex space-x-2">
          {Array.from({length: totalArticles}).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentArticleIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentArticleIndex ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}