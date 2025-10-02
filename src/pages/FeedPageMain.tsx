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
    <div className="min-h-screen bg-neutral-100">
      <div className="w-full relative flex flex-col">
        {/* Top Section with Gradient Background */}
        <div
          className="box-border content-stretch flex flex-col gap-[24px] items-center overflow-clip pb-[24px] pt-0 px-0 relative shrink-0 w-full"
          style={{
            background: 'linear-gradient(180deg, #323B86 0%, #3A2B7D 25%, #3A2A7C 50%, #3F1F76 100%)'
          }}
        >
          <div className="w-full max-w-[375px] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] mx-auto">
            <Header />
          </div>
          <div className="w-full max-w-[375px] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] mx-auto">
            <TopicTags />
          </div>
        </div>

        {/*Main Content Area*/}
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
          <div className="w-full max-w-[375px] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] mx-auto">
            <TabNavigation
              activeTab="articles"
              onTabChange={handleTabChange}
            />
          </div>
          <div className="w-full max-w-[375px] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] mx-auto px-3 md:px-6">
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
    </div>
  );
}