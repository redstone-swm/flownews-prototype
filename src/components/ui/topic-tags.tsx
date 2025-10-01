interface TopicTagsProps {
  topics?: string[];
}

const defaultTopics = [
  "국내 부동산 시장 동향",
  "2025년 뉴진스 활동", 
  "우주 탐사 경쟁 심화",
  "아이폰 17 출시",
  "2025년 파리 올림픽"
];

export function TopicTags({ topics = defaultTopics }: TopicTagsProps) {
  return (
    <div className="box-border content-stretch flex flex-col gap-[12px] items-start px-[12px] py-0 relative shrink-0 w-full">
      <div className="content-stretch flex gap-[8px] items-center relative rounded-[2px] shrink-0">
        <p className="font-sans font-semibold leading-[1.4] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[-0.35px] whitespace-pre">
          실시간 토픽 TOP 5
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full overflow-x-auto">
        {topics.map((topic, index) => (
          <div 
            key={index}
            className="bg-[rgba(255,255,255,0.3)] box-border content-stretch flex gap-[6px] h-[36px] items-center px-[12px] py-[6px] relative rounded-[20px] shrink-0"
          >
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[20px]" />
            <p className="font-sans font-semibold leading-[1.4] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#6ce9a6] text-[12px] text-nowrap tracking-[-0.3px] whitespace-pre">
              #
            </p>
            <p className="font-sans font-semibold leading-[1.4] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] text-nowrap text-white tracking-[-0.3px] whitespace-pre">
              {topic}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}