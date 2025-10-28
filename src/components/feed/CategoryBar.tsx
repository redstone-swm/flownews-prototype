import {useEffect, useRef} from "react";
import {Badge} from "@/components/ui";
import {Landmark, UserSquare2, DollarSign, Factory, Trophy, Music} from "lucide-react";
import {cn} from "@/lib/utils";

interface CategoryBarProps {
    activeCategory: string;
    setActiveCategory: (category: string) => void;
}

export const CategoryBar = ({activeCategory, setActiveCategory}: CategoryBarProps) => {
    const categories = [
        {id: "MY", icon: My},
        {id: "정치", icon: Landmark},
        {id: "경제", icon: DollarSign},
        {id: "산업", icon: Factory},
        {id: "사회", icon: UserSquare2},
        {id: "스포츠", icon: Trophy},
        {id: "연예", icon: Music},
    ];

    // 스크롤 컨테이너와 각 아이템 ref
    const containerRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

    useEffect(() => {
        const container = containerRef.current;
        const item = itemRefs.current[activeCategory];
        if (!container || !item) return;

        const containerWidth = container.clientWidth;
        const itemLeft = item.offsetLeft;
        const itemWidth = item.clientWidth;

        // 아이템을 컨테이너 중앙으로 오도록 목표 스크롤 계산
        const target = itemLeft - containerWidth / 2 + itemWidth / 2;

        const maxScroll = container.scrollWidth - containerWidth;
        const clamped = Math.max(0, Math.min(target, Math.max(0, maxScroll)));

        container.scrollTo({left: clamped, behavior: "smooth"});
    }, [activeCategory]);

    return (
        <div className="w-full bg-gray-100 py-3">
            <div
                ref={containerRef}
                className="flex px-3 items-center gap-2 overflow-x-auto scrollbar-hide"
            >
                {categories.map((category) => {
                    const isActive = activeCategory === category.id;
                    return (
                        <div
                            key={category.id}
                            ref={(el) => {
                                itemRefs.current[category.id] = el;
                            }}
                            className="flex-shrink-0"
                        >
                            <Badge
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
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const My = () => <img src="/Frame 218.svg" alt="" className="w-6 h-6"/>;
