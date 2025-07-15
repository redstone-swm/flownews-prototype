import {useEffect, useState} from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog.tsx';
import {Button} from '../ui/button.tsx';
import {Input} from '../ui/input.tsx';
import {useTopicSuggestionFeedbackMutation} from "@/hooks/useTopicSuggestionFeedbackMutation.ts";

interface TopicSuggestionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const TopicSuggestionModal = ({open, onOpenChange}: TopicSuggestionModalProps) => {
    const [ipAddress, setIpAddress] = useState<string>("");
    const [topicSuggestion, setTopicSuggestion] = useState<string>("");
    const [showThankYouModal, setShowThankYouModal] = useState<boolean>(false);

    useEffect(() => {
        const fetchIpAddress = async () => {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            setIpAddress(data.ip);
        };

        fetchIpAddress();
    }, []);

    const feedbackMutation = useTopicSuggestionFeedbackMutation({
        onSuccess: () => {
            setTopicSuggestion("");
            onOpenChange(false);
            setShowThankYouModal(true);
        },
        onError: () => {
            setTopicSuggestion("");
            onOpenChange(false);
            setShowThankYouModal(true);
        }
    });

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();

        if (!topicSuggestion.trim()) return;

        feedbackMutation.mutate({
            ipAddress,
            time: new Date().toISOString(),
            content: topicSuggestion
        });
    };

    const handleClose = () => {
        setTopicSuggestion("");
        onOpenChange(false);
    };

    const handleThankYouClose = () => {
        setShowThankYouModal(false);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>토픽 제안하기</DialogTitle>
                        <DialogDescription>
                            다루고 싶은 토픽을 제안해주세요.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Input
                                value={topicSuggestion}
                                onChange={(e) => setTopicSuggestion(e.target.value)}
                                placeholder="토픽을 입력해주세요..."
                                disabled={feedbackMutation.isPending}
                                autoFocus
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClose}
                                disabled={feedbackMutation.isPending}
                            >
                                취소
                            </Button>
                            <Button
                                type="submit"
                                disabled={feedbackMutation.isPending || !topicSuggestion.trim()}
                            >
                                확인
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* 감사 모달 */}
            <Dialog open={showThankYouModal} onOpenChange={setShowThankYouModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>감사합니다!</DialogTitle>
                        <DialogDescription>
                            토픽 제안을 주셔서 감사합니다. 소중한 의견을 검토하여 반영하도록 하겠습니다.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={handleThankYouClose}>
                            확인
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
