export interface MockStory {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
}

export const mockStories: MockStory[] = [
  {
    id: 1,
    title: "첫 번째 스토리",
    content: "이것은 첫 번째 스토리의 내용입니다. 상세한 설명을 포함합니다.",
    imageUrl: "/placeholder-story-1.jpg"
  },
  {
    id: 2,
    title: "두 번째 스토리",
    content: "이것은 두 번째 스토리의 내용입니다. 더 많은 정보를 담고 있습니다.",
    imageUrl: "/placeholder-story-2.jpg"
  },
  {
    id: 3,
    title: "세 번째 스토리",
    content: "이것은 세 번째 스토리의 내용입니다. 흥미로운 내용이 담겨 있습니다.",
    imageUrl: "/placeholder-story-3.jpg"
  }
];