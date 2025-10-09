import {Badge} from "@/components/ui";
import {Landmark, TrendingUp, UserSquare2} from "lucide-react";
import {cn} from "@/lib/utils";

interface CategoryBarProps {
    activeCategory: string;
    setActiveCategory: (category: string) => void;
}

export const CategoryBar = ({ activeCategory, setActiveCategory }: CategoryBarProps) => {
    
    const categories = [
        { id: 'MY', icon: My },
        { id: '정치', icon: Landmark },
        { id: '경제', icon: Economy},
        { id: '산업', icon: TrendingUp },
        { id: '사회', icon: UserSquare2 },
        { id: '스포츠', icon: UserSquare2 },
        { id: '연예', icon: UserSquare2 },
    ];

    return (
        <div className="w-full bg-gray-100  py-3">
            <div className="flex px-3 items-center gap-2 overflow-x-auto scrollbar-hide">
                {categories.map((category) => {
                    const isActive = activeCategory === category.id;
                    
                    return (
                        <Badge 
                            key={category.id}
                            variant="outline" 
                            className={cn(
                                "flex items-center gap-1.5 flex-shrink-0 transition-all cursor-pointer",
                                isActive && "bg-blue-500 text-white border-blue-500 rounded-full"
                            )}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            <category.icon className="w-4 h-4"/>
                            {category.id}
                        </Badge>
                    );
                })}
            </div>
        </div>
    )
}

const Economy = () => (
    <img src="/Frame 217.svg" alt="" className="w-6 h-6"/>
)

const My = () => (
    <img src="/Frame 218.svg" alt="" className="w-6 h-6"/>
)