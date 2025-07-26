import { useCallback, useState } from "react";

export function useTopicSuggestionModal() {
    const [downSwipeCount, setDownSwipeCount] = useState(() => {
        const saved = localStorage.getItem("downSwipeCount");
        return saved ? Number(saved) : 0;
    });
    const [canShowModal, setCanShowModal] = useState(true);

    const increaseDownSwipeCount = useCallback(() => {
        setCanShowModal(false);
        setDownSwipeCount(prev => {
            const next = prev + 1;
            localStorage.setItem("downSwipeCount", String(next));
            return next;
        });
    }, []);

    const resetDownSwipeCount = useCallback(() => {
        setDownSwipeCount(0);
        localStorage.setItem("downSwipeCount", "0");
    }, []);

    const showSuggestionModal = downSwipeCount > 3 && canShowModal;

    return {
        showSuggestionModal,
        increaseDownSwipeCount,
        resetDownSwipeCount
    };
}
