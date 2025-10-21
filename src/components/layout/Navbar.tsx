import {Link} from "@tanstack/react-router";
import NavbarAvatar from "@/components/layout/NavbarAvatar.tsx";
import {Search} from "lucide-react";
import {Input} from "@/components/ui";
import {NavbarBadge} from "@/components/layout/NavbarBadge.tsx";
import {Skeleton} from "@/components/ui/skeleton";
import type {TopicTopKQueryResponse} from "@/api/models";
import {NavbarNotifications} from "@/components/layout/NavbarNotifications";

interface NavbarProps {
    topKTopics?: TopicTopKQueryResponse[];
    topKLoading?: boolean;
}

export default function Navbar({topKTopics, topKLoading}: NavbarProps) {
    const headerClasses =
        "w-full bg-gradient-to-r from-[#323b86] to-[#3f1f76] sticky top-0 z-50 border-b border-gray";

    return (
        <header className={headerClasses}>
            <div
                className="flex flex-col items-center justify-between mx-auto   w-full h-full max-w-screen-lg gap-6 pb-6">
                <div className='w-full h-[52px] flex gap-4 items-center justify-between px-3'>
                    <div className="py-1.5 flex-shrink-0">
                        <Link to="/">
                            <img
                                src="/logo2-dark.png"
                                alt="logo"
                                className={`h-10 w-auto dark:hidden`}
                            />
                        </Link>
                    </div>
                    <div className="h-full flex items-center  max-w-xs lg:max-w-md">
                        <Link to={"/search"}>
                            <div className="h-full flex justify-center">
                                <div className="h-full relative w-full">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white"/>
                                    <Input
                                        placeholder="오늘도 시점과 함께!"
                                        className="py-2 h-full w-full pl-10 rounded-xl text-[12px] text-white bg-white/30 border-[1px] border-white/30 placeholder:text-white"
                                    />
                                </div>
                            </div>
                        </Link>
                        <div className='p-2'>
                            <NavbarNotifications/>
                        </div>
                        <div className=''>
                            <NavbarAvatar/>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-3 ">
                    <div className="px-3 text-white font-semibold text-[14px]">실시간 토픽 TOP 5</div>
                    <div className="px-3 flex  gap-2 overflow-x-auto flex-nowrap scrollbar-hide">
                        {topKLoading ? (
                            Array.from({length: 5}).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className="h-9  rounded-full bg-white/20"
                                />
                            ))
                        ) : topKTopics && topKTopics.length > 0 ? (
                            topKTopics.map((topic) => (
                                <Link key={topic.id} to="/topics/$topicId" params={{topicId: topic.id.toString()}}>
                                    <NavbarBadge text={topic.title}/>
                                </Link>
                            ))
                        ) : null}
                    </div>
                </div>
            </div>

        </header>
    );
}
