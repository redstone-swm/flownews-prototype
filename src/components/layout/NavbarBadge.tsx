import {Badge} from "@/components/ui";
import {cn} from "@/lib/utils.ts";

export const NavbarBadge = ({text, className}: { text: string, className?: string }) => (
    <Badge
        variant="transparent"
        className={cn(className, "gap-1.5 h-9 px-3 py-1.5 text-xs whitespace-nowrap flex-shrink-0")}
    >
        <div className="text-green-400">#</div>
        {text}
    </Badge>
)