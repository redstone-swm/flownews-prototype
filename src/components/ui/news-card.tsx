import React from 'react';

const imgUnion = "http://localhost:3845/assets/6ca18fb515c50b12450f50aa93f6fe5cd047ba96.svg";
const imgLineRoundedPlus = "http://localhost:3845/assets/68fe320cd3a650824a3a82594fa9b83406c2dc34.svg";
const imgHeroiconsOutlineArrowUpOnSquare = "http://localhost:3845/assets/431c01414bf95299a561eeb1db0564f369fa968a.svg";

interface NewsCardProps {
  topic: string;
  date: string;
  time: string;
  title: string;
  content: string;
  tags: string[];
  likeCount: string;
  isSubscribed?: boolean;
  onAddToInterest?: () => void;
  onLike?: () => void;
  onShare?: () => void;
}


export function NewsCard({ 
  topic, 
  date, 
  time, 
  title, 
  content, 
  tags, 
  likeCount, 
  isSubscribed = false, 
  onAddToInterest,
  onLike,
  onShare 
}: NewsCardProps) {
  return (
    <div className="bg-white relative rounded-[20px] shrink-0 w-[351px]">
      <div className="content-stretch flex flex-col items-end justify-center overflow-clip relative w-[351px]">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start justify-center overflow-clip p-[12px] relative shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
            {/* Header with topic and date/time */}
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
              <div className="bg-white box-border content-stretch flex gap-[6px] h-[28px] items-center px-[10px] py-[4px] relative rounded-[20px] shrink-0">
                <div aria-hidden="true" className="absolute border border-[#b8c8ff] border-solid inset-0 pointer-events-none rounded-[20px]" />
                <p className="bg-clip-text font-sans font-semibold leading-[1.4] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] text-nowrap tracking-[-0.3px] whitespace-pre" style={{ WebkitTextFillColor: "transparent", background: "linear-gradient(135deg, #6ce9a6 0%, #4f9cf9 100%)", WebkitBackgroundClip: "text" }}>
                  #
                </p>
                <p className="font-sans font-semibold leading-[1.4] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#111121] text-[12px] text-nowrap tracking-[-0.3px] whitespace-pre">
                  {topic}
                </p>
              </div>
              <div className="content-stretch flex gap-[2px] items-center justify-end relative shrink-0">
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                  <p className="font-sans font-normal leading-[1.4] not-italic relative shrink-0 text-[#999999] text-[12px] text-nowrap tracking-[-0.3px] whitespace-pre">
                    {date}
                  </p>
                </div>
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                  <p className="font-sans font-normal leading-[1.4] not-italic relative shrink-0 text-[#999999] text-[12px] text-nowrap tracking-[-0.3px] whitespace-pre">
                    {time}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                <p className="basis-0 font-sans font-bold grow leading-[1.4] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#111121] text-[16px] tracking-[-0.4px]">
                  {title}
                </p>
              </div>
              <div className="font-sans font-normal leading-[1.6] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#767676] text-[14px] tracking-[-0.35px] w-full line-clamp-3">
                {content}
              </div>
            </div>
            
            {/* Tags */}
            <div className="content-stretch flex gap-[6px] items-start relative shrink-0 w-full flex-wrap">
              {tags.map((tag, index) => (
                <div key={index} className="bg-[#eef0f3] box-border content-stretch flex gap-[6px] h-[28px] items-center px-[10px] py-[4px] relative rounded-[4px] shrink-0">
                  <p className="font-sans font-semibold leading-[1.4] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#111121] text-[12px] text-nowrap tracking-[-0.3px] whitespace-pre">
                    {tag}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Action Bar */}
        <div className="bg-[#f7f7f7] content-stretch flex gap-px items-center justify-center relative shrink-0 w-full">
          {/* Add to Interest / Subscribed Button */}
          <button className="basis-0 box-border content-stretch cursor-pointer flex gap-[4px] grow h-[44px] items-center justify-center min-h-px min-w-px overflow-visible px-[12px] py-[8px] relative shrink-0" onClick={onAddToInterest}>
            <div className="relative shrink-0 size-[20px]">
              <img alt="" className="block max-w-none size-full" src={imgLineRoundedPlus} />
            </div>
            <p className="font-sans font-semibold leading-[1.4] not-italic relative shrink-0 text-[#2e51bf] text-[14px] text-nowrap tracking-[-0.35px] whitespace-pre">
              관심 토픽에 추가
            </p>
          </button>
          
          <div className="bg-[rgba(0,0,0,0.1)] h-[20px] shrink-0 w-px" />
          
          {/* Like Button */}
          <div className="box-border content-stretch flex gap-[4px] h-[44px] items-center justify-center px-[12px] py-[8px] relative shrink-0 w-[72px] cursor-pointer" onClick={onLike}>
            <button className="block cursor-pointer overflow-clip relative shrink-0 size-[20px]">
              <div className="absolute inset-[15.63%_12.5%]">
                <div className="absolute inset-[-5.45%_-5%]">
                  <img alt="" className="block max-w-none size-full" src={imgUnion} />
                </div>
              </div>
            </button>
            <p className="font-sans font-semibold leading-[1.4] not-italic relative shrink-0 text-[#999999] text-[12px] text-nowrap tracking-[-0.3px] whitespace-pre">
              {likeCount}
            </p>
          </div>
          
          <div className="bg-[rgba(0,0,0,0.1)] h-[20px] shrink-0 w-px" />
          
          {/* Share Button */}
          <div className="box-border content-stretch flex gap-[4px] h-[44px] items-center justify-center px-[12px] py-[8px] relative shrink-0 w-[72px] cursor-pointer" onClick={onShare}>
            <div className="relative shrink-0 size-[20px]">
              <img alt="" className="block max-w-none size-full" src={imgHeroiconsOutlineArrowUpOnSquare} />
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}