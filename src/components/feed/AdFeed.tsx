import {cn} from "@/lib/utils.ts";
import {MessageCircleMore} from "lucide-react";

export const AdFeed = ({className, ...props}: { className?: String }) => {
    return (
        <div className={cn("mx-3 bg-yellow-300 rounded-lg p-4", className)} {...props}>
            <a
                href="https://forms.gle/LTdLuwiyr37pV8FF7"
                className="block text-center"
            >
                <h3 className="text-lg font-bold text-black mb-2 flex items-center justify-center gap-2">
                    <MessageCircleMore className="w-5 h-5" />
                    시점 사용자님들의 의견을 들려주세요!
                </h3>
                <p className="text-sm text-black/80 mb-3">
                    시점을 어떻게 하면 더 편리하게 만들 수 있을까요? <br/>
                    여러분의 <span className="font-bold text-black">소중한 의견</span>을 들려주시면, 더 나은 시점을 만들어가는데 큰 도움이 됩니다.
                </p>
                <div className="bg-black text-yellow-300 py-2 px-4 rounded-full inline-block font-semibold text-sm">
                    참여하기 →
                </div>
            </a>
        </div>
    )
}