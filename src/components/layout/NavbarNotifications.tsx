// filepath: /Users/pgh/WebstormProjects/flownews-prototype/src/components/layout/NavbarNotifications.tsx
import {Bell} from "lucide-react";
import {Button} from "@/components/ui";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui";
import {ScrollArea, Separator} from "@/components/ui";
import {formatDistanceToNow} from "date-fns";
import {ko} from "date-fns/locale";
import {useGetNotifications} from "@/api/notification-api/notification-api.ts";
import {useAuth} from "@/contexts/AuthContext.tsx";


export function NavbarNotifications() {
    const {isAuthenticated} = useAuth();
    const {data: items} = useGetNotifications({
        query: {
            enabled: isAuthenticated
        }
    });

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-8 w-8 text-white hover:bg-white/20"
                    aria-label="알림 열기"
                >
                    <Bell className="h-5 w-5"/>

                    {/*        <span*/}
                    {/*            className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none text-white">*/}
                    {/*  3*/}
                    {/*</span>*/}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
                <div className="p-2">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">알림</p>
                        {/*<button className="text-xs text-muted-foreground hover:underline">모두 읽음</button>*/}
                    </div>
                </div>
                <Separator/>
                {(!isAuthenticated || !items || items.length === 0) ? (
                    <div className="p-6 text-center text-sm text-muted-foreground">알림이 없습니다.</div>
                ) : (
                    <ScrollArea className="max-h-80">
                        <ul className="divide-y">
                            {items.map((item, i) => (
                                <li key={i} className="p-3 hover:bg-accent/40">
                                    <div className="flex items-start gap-3">
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="truncate text-[13px] font-medium">{item.title}</p>
                                                {item.sentAt ? (
                                                    <p className="text-[11px] text-muted-foreground flex-shrink-0 ml-2">{
                                                        formatDistanceToNow(new Date(item.sentAt), {
                                                            addSuffix: true,
                                                            locale: ko
                                                        })}</p>
                                                ) : null}
                                            </div>
                                            {item.body ? (
                                                <p className="mt-0.5 line-clamp-2 text-[12px] text-muted-foreground">{item.body}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </ScrollArea>
                )}
            </PopoverContent>
        </Popover>
    );
}
