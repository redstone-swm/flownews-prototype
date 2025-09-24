import type {Meta, StoryObj} from "@storybook/react";
import "../styles.css";
import {NewsArticleReference} from "@/components/feed/news-article-reference.tsx";

const meta = {
    title: "Sijeom/NewsArticleReference",
    component: NewsArticleReference,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        source: {
            control: "text",
            description: "언론사 명",
        },
        date: {
            control: "text",
            description: "기사 날짜 (yyyy.mm.dd)",
        },
        title: {
            control: "text",
            description: "기사 제목",
        },
        sourceBgColor: {
            control: "text",
            description: "소스 배지 배경색 (Tailwind 클래스)",
        },
        link: {
            control: "text",
            description: "기사 링크 URL",
        },
    },
} satisfies Meta<typeof NewsArticleReference>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        source: "연합뉴스",
        date: "2025.01.01",
        title: "기사 이름",
        link: "https://example.com/news/1",
    },
};

export const DifferentColors: Story = {
    args: {
        source: "조선일보",
        date: "2025.02.15",
        title: "다양한 색상의 소스 배지",
        link: "https://example.com/news/colors",
    },
    decorators: [
        (_) => (
            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-medium mb-2">기본 (Gray)</h3>
                    <NewsArticleReference
                        source="연합뉴스"
                        date="2025.01.01"
                        title="기본 회색 배경"
                        sourceBgColor="bg-gray-700"
                        link="https://example.com/news/gray"
                    />
                </div>
                <div>
                    <h3 className="text-sm font-medium mb-2">파란색 (Blue)</h3>
                    <NewsArticleReference
                        source="조선일보"
                        date="2025.01.02"
                        title="파란색 배경"
                        sourceBgColor="bg-blue-600"
                        link="https://example.com/news/blue"
                    />
                </div>
            </div>
        ),
    ],
};

export const ResponsiveDemo: Story = {
    args: {
        source: "연합뉴스",
        date: "2025.01.01",
        title: "반응형 테스트 기사",
        link: "https://example.com/news/responsive",
    },
    decorators: [
        (Story) => (
            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-medium mb-2">모바일 (320px)</h3>
                    <div className="w-80 border p-4">
                        <Story/>
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-medium mb-2">태블릿 (768px)</h3>
                    <div className="w-96 border p-4">
                        <Story/>
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-medium mb-2">데스크톱 (1024px)</h3>
                    <div className="w-full max-w-lg border p-4">
                        <Story/>
                    </div>
                </div>
            </div>
        ),
    ],
};