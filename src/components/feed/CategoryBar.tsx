import {Badge} from "@/components/ui";
import {TrendingUp, Trophy} from "lucide-react";

export const CategoryBar = () => {
    return (
        <div className="w-full bg-gray-100  py-3">
            <div className="flex px-3 items-center gap-2 overflow-x-auto scrollbar-hide">
                <Badge variant="outline" className="flex items-center gap-1.5 flex-shrink-0">
                    <TrendingUp className="w-4 h-4"/>
                    경제
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1.5 flex-shrink-0">
                    <Trophy className="w-4 h-4"/>
                    스포츠
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1.5 flex-shrink-0">
                    <TrendingUp className="w-4 h-4"/>
                    경제
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1.5 flex-shrink-0">
                    <Trophy className="w-4 h-4"/>
                    스포츠
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1.5 flex-shrink-0">
                    <TrendingUp className="w-4 h-4"/>
                    경제
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1.5 flex-shrink-0">
                    <Trophy className="w-4 h-4"/>
                    스포츠
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1.5 flex-shrink-0">
                    <TrendingUp className="w-4 h-4"/>
                    경제
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1.5 flex-shrink-0">
                    <Trophy className="w-4 h-4"/>
                    스포츠
                </Badge>
            </div>
        </div>
    )
}