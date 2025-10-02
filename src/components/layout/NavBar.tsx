import {Link} from "@tanstack/react-router";
import NavbarAvatar from "@/components/layout/NavbarAvatar.tsx";
import {Search} from "lucide-react";
import {Badge, Input} from "@/components/ui";
import {NavBarBadge} from "@/components/layout/NavBarBadge.tsx";

export default function NavBar() {
    const headerClasses =
        "w-full bg-gradient-to-r from-[#323b86] to-[#3f1f76] sticky top-0 z-50 border-b border-gray";

    return (
        <header className={headerClasses}>
            <div
                className="flex flex-col items-center justify-between mx-auto  w-full h-full max-w-screen-lg gap-6 pb-6">
                <div className='w-full h-[52px] flex gap-4 items-center justify-between px-3'>
                    <div className="py-1.5">
                        <Link to="/">
                            <img
                                src="/logo2-dark.png"
                                alt="logo"
                                className={`h-10 w-auto  dark:hidden`}
                            />
                        </Link>
                    </div>
                    <div className="py-2.5 h-full flex items-center gap-1 max-w-xs lg:max-w-md">
                        <div className="h-full flex justify-center">
                            <div className="h-full relative w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white"/>
                                <Input
                                    placeholder="오늘도 시점과 함께!"
                                    className="h-full w-full pl-10 rounded-xl text-[12px] text-white bg-white/30 border-[1px] border-white/30 placeholder:text-white"
                                />
                            </div>
                        </div>
                        <div className='p-2'>
                            <NavbarAvatar/>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-3 ">
                    <div className="px-3 text-white font-semibold text-[14px]">실시간 토픽 TOP 5</div>
                    <div className="px-3 flex  gap-2 overflow-x-auto flex-nowrap scrollbar-hide">
                        <NavBarBadge text={"국내 부동산 시장 동향"}/>
                        <NavBarBadge text={"뉴진스 2025년 활동"}/>
                        <NavBarBadge text={"우주 탐사 경쟁 심화"}/>
                        <NavBarBadge text={"ㅁㄴㅇㄹ"}/>
                        <NavBarBadge text={"ㅁㄴㅇㄹ"}/>
                    </div>
                </div>
            </div>

        </header>
    );
}
