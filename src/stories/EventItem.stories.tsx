import type { Meta, StoryObj } from "@storybook/react";
import "../styles.css";
import { EventItem, type EventItemProps } from "@/components/ui/event-item";

// Helper function to create dates relative to now
const createRelativeDate = (hoursAgo: number): string => {
  const now = new Date();
  const date = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
  return date.toISOString().slice(0, 19).replace('T', ' ');
};

const meta = {
  title: "Sijeom/EventItem",
  component: EventItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof EventItem>;

export default meta;

type Story = StoryObj<EventItemProps>;

export const Default: Story = {
  args: {
    event: {
      title: "이벤트 타이틀",
      content: "이벤트 내용",
      date: createRelativeDate(25), // 25시간 전 (어제)
    },
    articles: [{
      source: "연합뉴스",
      date: "2025.01.01",
      title: "기사 이름",
      sourceBgColor: "bg-gray-500",
      link: "https://example.com/news/1",
    }],
    reactions: {
      heartCount: 1000,
      angryCount: 1000,
      activeReaction: null,
    },
    showTimeline: true,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md bg-white border rounded-lg overflow-hidden">
        <Story />
      </div>
    ),
  ],
};

export const WithActiveReaction: Story = {
  args: {
    event: {
      title: "반응이 활성화된 이벤트",
      content: "사용자가 좋아요를 눌렀습니다.",
      date: createRelativeDate(1), // 1시간 전
    },
    articles: [{
      source: "조선일보",
      date: "2025.01.02",
      title: "반응 테스트 기사",
      sourceBgColor: "bg-blue-600",
      link: "https://example.com/news/2",
    }],
    reactions: {
      heartCount: 2500,
      angryCount: 850,
      activeReaction: "heart",
    },
    showTimeline: true,
  },
  decorators: Default.decorators,
};

export const MultipleArticles: Story = {
  args: {
    event: {
      title: "여러 기사가 있는 이벤트",
      content: "이 이벤트에는 여러 언론사의 기사가 연결되어 있습니다.",
      date: createRelativeDate(2), // 2시간 전
    },
    articles: [
      {
        source: "연합뉴스",
        date: "2025.01.03",
        title: "첫 번째 관련 기사",
        sourceBgColor: "bg-gray-500",
        link: "https://example.com/news/3a",
      },
      {
        source: "조선일보", 
        date: "2025.01.03",
        title: "두 번째 관련 기사",
        sourceBgColor: "bg-blue-600",
        link: "https://example.com/news/3b",
      },
      {
        source: "중앙일보",
        date: "2025.01.03", 
        title: "세 번째 관련 기사",
        sourceBgColor: "bg-red-600",
        link: "https://example.com/news/3c",
      }
    ],
    reactions: {
      heartCount: 5200,
      angryCount: 123,
      activeReaction: "heart",
    },
    showTimeline: true,
  },
  decorators: Default.decorators,
};

export const LargeNumbers: Story = {
  args: {
    event: {
      title: "큰 숫자 반응 테스트",
      content: "많은 반응을 받은 이벤트입니다.",
      date: createRelativeDate(6), // 6시간 전
    },
    articles: [{
      source: "한겨레",
      date: "2025.01.04",
      title: "바이럴 기사",
      sourceBgColor: "bg-green-600",
      link: "https://example.com/news/4",
    }],
    reactions: {
      heartCount: 25300,
      angryCount: 8750,
      activeReaction: "angry",
    },
    showTimeline: true,
  },
  decorators: Default.decorators,
};

export const SmallNumbers: Story = {
  args: {
    event: {
      title: "작은 숫자 반응 테스트",
      content: "적은 반응을 받은 이벤트입니다.",
      date: createRelativeDate(0.5), // 30분 전 (방금전으로 표시)
    },
    articles: [{
      source: "경향신문",
      date: "2025.01.05",
      title: "소규모 기사",
      sourceBgColor: "bg-purple-600",
      link: "https://example.com/news/5",
    }],
    reactions: {
      heartCount: 42,
      angryCount: 7,
      activeReaction: null,
    },
    showTimeline: true,
  },
  decorators: Default.decorators,
};

export const Timeline: Story = {
  args: {},
  decorators: [
    (_) => (
      <div className="w-full max-w-md bg-gray-50 p-4">
        <div className="space-y-0 bg-white border rounded-lg overflow-hidden">
          <EventItem
            event={{
              title: "첫 번째 이벤트",
              content: "첫 번째 이벤트의 내용입니다.",
              date: createRelativeDate(3), // 3시간 전
            }}
            articles={[{
              source: "연합뉴스",
              date: "2025.01.21",
              title: "첫 번째 이벤트 관련 기사",
              sourceBgColor: "bg-gray-500",
              link: "https://example.com/timeline/1",
            }]}
            reactions={{
              heartCount: 2100,
              angryCount: 150,
              activeReaction: "heart",
            }}
          />
          <EventItem
            event={{
              title: "두 번째 이벤트",
              content: "두 번째 이벤트의 내용입니다.",
              date: createRelativeDate(2), // 2시간 전
            }}
            articles={[
              {
                source: "조선일보",
                date: "2025.01.21",
                title: "두 번째 이벤트 첫 번째 기사",
                sourceBgColor: "bg-blue-600",
                link: "https://example.com/timeline/2a",
              },
              {
                source: "중앙일보",
                date: "2025.01.21", 
                title: "두 번째 이벤트 두 번째 기사",
                sourceBgColor: "bg-red-600",
                link: "https://example.com/timeline/2b",
              }
            ]}
            reactions={{
              heartCount: 1500,
              angryCount: 800,
            }}
          />
          <EventItem
            event={{
              title: "세 번째 이벤트",
              content: "세 번째 이벤트의 내용입니다.",
              date: createRelativeDate(1), // 1시간 전
            }}
            articles={[{
              source: "한겨레",
              date: "2025.01.21",
              title: "세 번째 이벤트 관련 기사",
              sourceBgColor: "bg-green-600",
              link: "https://example.com/timeline/3",
            }]}
            reactions={{
              heartCount: 3200,
              angryCount: 450,
            }}
          />
        </div>
      </div>
    ),
  ],
};