import type { Meta, StoryObj } from "@storybook/react";
import "../styles.css";
import { ArticleItem, type ArticleItemProps } from "@/components/ui/article-item";

const meta = {
  title: "Sijeom/ArticleItem",
  component: ArticleItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ArticleItem>;

export default meta;

type Story = StoryObj<ArticleItemProps>;

export const Single: Story = {
  args: {
    articles: [{
      source: "연합뉴스",
      date: "2025.01.15",
      title: "단일 기사 제목입니다",
      sourceBgColor: "bg-gray-500",
      link: "https://example.com/news/1",
    }],
    reactions: {
      heartCount: 1200,
      angryCount: 450,
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

export const Multiple: Story = {
  args: {
    articles: [
      {
        source: "조선일보",
        date: "2025.01.15",
        title: "첫 번째 기사 제목",
        sourceBgColor: "bg-blue-600",
        link: "https://example.com/news/1",
      },
      {
        source: "중앙일보",
        date: "2025.01.15",
        title: "두 번째 기사 제목",
        sourceBgColor: "bg-red-600",
        link: "https://example.com/news/2",
      },
      {
        source: "한겨레",
        date: "2025.01.15",
        title: "세 번째 기사 제목",
        sourceBgColor: "bg-green-600",
        link: "https://example.com/news/3",
      }
    ],
    reactions: {
      heartCount: 3500,
      angryCount: 120,
      activeReaction: "heart",
    },
    showTimeline: true,
  },
  decorators: Single.decorators,
};

export const WithActiveReaction: Story = {
  args: {
    articles: [{
      source: "경향신문",
      date: "2025.01.15",
      title: "반응이 활성화된 기사",
      sourceBgColor: "bg-purple-600",
      link: "https://example.com/news/active",
    }],
    reactions: {
      heartCount: 8900,
      angryCount: 2100,
      activeReaction: "angry",
    },
    showTimeline: true,
  },
  decorators: Single.decorators,
};

export const LargeNumbers: Story = {
  args: {
    articles: [{
      source: "서울신문",
      date: "2025.01.15", 
      title: "높은 반응을 받은 기사",
      sourceBgColor: "bg-indigo-600",
      link: "https://example.com/news/viral",
    }],
    reactions: {
      heartCount: 45600,
      angryCount: 12300,
      activeReaction: "heart",
    },
    showTimeline: true,
  },
  decorators: Single.decorators,
};