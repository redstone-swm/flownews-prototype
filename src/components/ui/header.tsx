import React from 'react';

const imgLogo = "http://localhost:3845/assets/166a8c79dcf245ada728c3c86c0ad0cc96480634.svg";
const searchIcon = "http://localhost:3845/assets/12e20ddb25dc9cebf4692c0e467181ce3429d1ee.svg";
const bellIcon = "http://localhost:3845/assets/6cc08df69196148a4ed61936c29ce7c270405a3b.svg";

export function Header() {
  return (
    <div className="h-[52px] overflow-clip relative shrink-0 w-[375px]">
      {/* Logo */}
      <div className="absolute h-[24px] left-[12px] top-1/2 translate-y-[-50%] w-[83px]">
        <img alt="SIJEOM" className="block max-w-none size-full" src={imgLogo} />
      </div>
      
      {/* Right side controls */}
      <div className="absolute content-stretch flex gap-[4px] items-center right-[12px] top-[10px]">
        {/* Search bar */}
        <div className="bg-[rgba(255,255,255,0.3)] box-border content-stretch flex gap-[8px] h-[32px] items-center p-[10px] relative rounded-[10px] shrink-0 w-[175px]">
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[10px]" />
          <div className="overflow-clip relative shrink-0 size-[20px]">
            <div className="absolute inset-[12.5%]">
              <div className="absolute inset-[-5%]">
                <img alt="search" className="block max-w-none size-full" src={searchIcon} />
              </div>
            </div>
          </div>
          <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
            <p className="font-sans font-normal leading-[1.4] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] text-nowrap text-white tracking-[-0.3px] whitespace-pre">
              오늘도 시점과 함께!
            </p>
          </div>
        </div>
        
        {/* Bell icon with notification */}
        <div className="relative shrink-0 size-[32px]">
          <div className="absolute inset-[21.88%_28.13%]">
            <div className="absolute inset-[-4.17%_-5.36%]">
              <img alt="notifications" className="block max-w-none size-full" src={bellIcon} />
            </div>
          </div>
          <div className="absolute aspect-[16/16] bg-[#eb6262] left-[68.75%] right-[12.5%] rounded-[20px] top-[4px]" />
        </div>
      </div>
    </div>
  );
}