import type {Meta, StoryObj} from "@storybook/react";
import "../styles.css";
import {EventFeed, type EventFeedProps} from "@/components/feed/EventFeed.tsx";

const meta = {
    title: "Sijeom/EventFeed",
    component: EventFeed,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof EventFeed>;

export default meta;

type Story = StoryObj<EventFeedProps>;

export const Default: Story = {
    args: {
        event: {
            topicName: "민생 회복 예산안 평가 및 여야 대립",
            eventTitle: "22대 국회 정기회 개회 여야 대립 시작",
            eventDescription: "22대 국회 두번째 정기회가 9월 1일 개회되어 이재명 정부 첫 예산안과 개혁입법을 둘러싼 여야 대립이 시작됐다. " +
                "우원식 국회의장은 개회사에서 한반도 평화 결의안 채택과 사회경제적 민주주의 실현을 강조하며, 산재 보험기금 확대와 생명안전기본법 제정 필요성을 역설했다. " +
                "또한 한국판 IRA법 추진과 AI 산업 육성, 개헌 추진을 위한 국회 주도 개헌특위 구성을 촉구했다. 여야는 100일간 치열한 입법 경쟁에 돌입할 전망이다.",
            date: "2025-01-15 14:30:00",
        },
        articles: [{
            source: "연합뉴스",
            date: "2025.01.15",
            title: "국정감사 관련 주요 발언",
            sourceBgColor: "bg-gray-500",
            link: "https://example.com/news/1",
        }],
        reactions: {
            heartCount: 1200,
            angryCount: 450,
            activeReaction: null,
        },
        isRecommended: false,
        isFollowing: false,
        onFollowToggle: () => console.log("Follow toggled"),
        showTimeline: true,
    },
    decorators: [
        (Story) => (
            <div className="w-full max-w-md bg-gray-50 p-4">
                <Story/>
            </div>
        ),
    ],
};

export const WithImage: Story = {
    args: {
        event: {
            topicName: "민생 회복 예산안 평가 및 여야 대립",
            eventTitle: "22대 국회 정기회 개회 여야 대립 시작",
            eventDescription: "22대 국회 두번째 정기회가 9월 1일 개회되어 이재명 정부 첫 예산안과 개혁입법을 둘러싼 여야 대립이 시작됐다. " +
                "우원식 국회의장은 개회사에서 한반도 평화 결의안 채택과 사회경제적 민주주의 실현을 강조하며, 산재 보험기금 확대와 생명안전기본법 제정 필요성을 역설했다. " +
                "또한 한국판 IRA법 추진과 AI 산업 육성, 개헌 추진을 위한 국회 주도 개헌특위 구성을 촉구했다. 여야는 100일간 치열한 입법 경쟁에 돌입할 전망이다.",
            date: "2025-01-15 16:45:00",
        },
        articles: [
            {
                source: "연합뉴스",
                date: "2025.01.15",
                title: "코스피 2800선 돌파",
                sourceBgColor: "bg-gray-500",
                link: "https://example.com/news/1",
            },
            {
                source: "조선일보",
                date: "2025.01.15",
                title: "외국인 매수세 지속",
                sourceBgColor: "bg-blue-600",
                link: "https://example.com/news/2",
            }
        ],
        reactions: {
            heartCount: 3500,
            angryCount: 120,
            activeReaction: "heart",
        },
        imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop&crop=center",
        isRecommended: true,
        isFollowing: true,
        onFollowToggle: () => console.log("Follow toggled"),
        showTimeline: true,
    },
    decorators: Default.decorators,
};