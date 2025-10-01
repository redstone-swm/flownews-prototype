import { Header } from '@/components/ui/header';
import { TopicTags } from '@/components/ui/topic-tags';
import { TabNavigation } from '@/components/ui/tab-navigation';
import { CategoryFilter } from '@/components/ui/category-filter';
import { NewsFeed } from '@/components/ui/news-feed';

export default function FeedPageMain() {
  const handleTabChange = (tab: string) => {
    console.log('Tab changed to:', tab);
  };

  const handleCategoryChange = (categoryId: string) => {
    console.log('Category changed to:', categoryId);
  };

  const handleAddToInterest = (itemId: string) => {
    console.log('Add to interest:', itemId);
  };

  const handleLike = (itemId: string) => {
    console.log('Like item:', itemId);
  };

  const handleShare = (itemId: string) => {
    console.log('Share item:', itemId);
  };

  return (
      <div>
     {/*<div className="bg-neutral-100 overflow-clip relative rounded-[24px]">*/}
      <div className="absolute content-stretch flex flex-col items-start left-1/2 top-0 translate-x-[-50%] w-[375px]">
        {/* Top Section with Gradient Background */}
        <div
          className="box-border content-stretch flex flex-col gap-[24px] items-center overflow-clip pb-[24px] pt-0 px-0 relative shrink-0 w-full"
          style={{
            background: 'linear-gradient(180deg, #323B86 0%, #3A2B7D 25%, #3A2A7C 50%, #3F1F76 100%)'
          }}
        >

          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
            <Header />
          </div>
          <TopicTags />
        </div>

         {/*Main Content Area*/}
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
          <TabNavigation
            activeTab="articles"
            onTabChange={handleTabChange}
          />
          <div className="content-stretch flex flex-col gap-[12px] items-center justify-center relative shrink-0 w-full">
            <CategoryFilter onCategoryChange={handleCategoryChange} />
            <NewsFeed
              onAddToInterest={handleAddToInterest}
              onLike={handleLike}
              onShare={handleShare}
            />
          </div>
        </div>
      </div>
    </div>
  );
}