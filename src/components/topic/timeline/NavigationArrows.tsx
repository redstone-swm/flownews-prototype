import {ChevronLeft, ChevronRight} from "lucide-react";
import {useEffect, useState} from "react";

interface NavigationArrowsProps {
    currentIndex: number;
    totalItems: number;
    onNext: () => void;
    onPrevious: () => void;
}

export function NavigationArrows({
                                     currentIndex,
                                     totalItems,
                                     onNext,
                                     onPrevious
                                 }: NavigationArrowsProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let hideTimeout: ReturnType<typeof setTimeout>;

        const showArrows = () => {
            setIsVisible(true);
            clearTimeout(hideTimeout);
            hideTimeout = setTimeout(() => {
                setIsVisible(false);
            }, 1000); // 3초 후 숨김
        };

        const handleMouseMove = () => showArrows();
        const handleTouchStart = () => showArrows();
        const handleTouchMove = () => showArrows();

        // 초기 표시
        showArrows();

        // 이벤트 리스너 등록
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('touchstart', handleTouchStart, {passive: true});
        document.addEventListener('touchmove', handleTouchMove, {passive: true});

        return () => {
            clearTimeout(hideTimeout);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return (
        <>
            {/* 다음 버튼 */}
            {currentIndex !== totalItems - 1 && (
                <button
                    onClick={onNext}
                    className={`absolute right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/5 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 text-white ${
                        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                >
                    <ChevronRight size={24}/>
                </button>
            )}

            {/* 이전 버튼 */}
            {currentIndex !== 0 && (
                <button
                    onClick={onPrevious}
                    className={`absolute left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/5 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 text-white ${
                        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                >
                    <ChevronLeft size={24}/>
                </button>
            )}
        </>
    );
}
