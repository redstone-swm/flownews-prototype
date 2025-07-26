import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from '@/components/ui/dialog.tsx'
import {Button} from "@/components/ui/button.tsx";
import {useTimelineFeedbackMutation} from "@/hooks/useTimelineFeedbackMutation.ts";
import {useEffect, useState} from "react";

interface TimelineFeedbackModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    topicId: number;
}

export default function TimelineFeedbackModal({ open, onOpenChange, topicId }: TimelineFeedbackModalProps) {
    const [ipAddress, setIpAddress] = useState<string>("");
    const [feedbackContent, setFeedbackContent] = useState<string>("");
    const [showInput, setShowInput] = useState<boolean>(false);

    useEffect(() => {
        const fetchIpAddress = async () => {
            const response = await fetch("https://api.ipify.org?format=json");
            const data = await response.json();
            setIpAddress(data.ip);
        };

        fetchIpAddress();
    }, []);

    const feedbackMutation = useTimelineFeedbackMutation({
        onSuccess: () => {
            onOpenChange(false);
        },
        onError: () => {
            onOpenChange(false);
        },
    });

    const handleFeedback = async (score: number | null) => {
        feedbackMutation.mutate({
            topicId,
            ipAddress,
            time: new Date().toISOString(),
            content: score === 0 ? feedbackContent : null, // "아니요"일 경우 content 포함
            score,
        });
    };

    const handleClose = () => {
        handleFeedback(null);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent onInteractOutside={handleClose}>
                <DialogHeader>
                    <DialogTitle>이 타임라인이 토픽을 이해하는 데 도움이 되셨나요?</DialogTitle>
                    <DialogDescription>
                        여러분들의 의견을 남겨주세요.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="items-center">
                    {!showInput ? ( // "아니요"를 누르기 전
                        <>
                            <Button
                                variant="default_feedback"
                                onClick={() => handleFeedback(5)}
                                disabled={feedbackMutation.isPending}
                            >
                                네!
                            </Button>
                            <Button
                                variant="destructive_feedback"
                                onClick={() => setShowInput(true)} // "아니요"를 누르면 input 표시
                                disabled={feedbackMutation.isPending}
                            >
                                아니요
                            </Button>
                        </>
                    ) : ( // "아니요"를 누른 후
                        <div className="w-full">
                            <input
                                type="text"
                                placeholder="어떤 점이 안 좋았는지 알려주세요."
                                value={feedbackContent}
                                onChange={(e) => setFeedbackContent(e.target.value)}
                                className="mt-2 w-full border rounded p-2"
                                disabled={feedbackMutation.isPending}
                            />
                            <Button
                                variant="default_feedback"
                                onClick={() => handleFeedback(0)}
                                disabled={feedbackMutation.isPending || !feedbackContent.trim()}
                                className="mt-2"
                            >
                                제출하기
                            </Button>
                        </div>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}