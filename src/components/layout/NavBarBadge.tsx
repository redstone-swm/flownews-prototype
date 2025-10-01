import {Badge} from "@/components/ui";

export const NavBarBadge = ({text}: { text: string }) => (
    <Badge
        variant="transparent"
        className="gap-1.5 px-3 py-1.5 text-xs whitespace-nowrap flex-shrink-0"
    >
        <div className="text-green-400">#</div>
        {text}
    </Badge>
)