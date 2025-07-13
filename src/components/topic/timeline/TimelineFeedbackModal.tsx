import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from '@/components/ui/dialog'
import {Button} from "@/components/ui/button.tsx";
import {useTimelineFeedbackMutation} from "@/hooks/useTimelineFeedbackMutation";

interface TimelineFeedbackModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    topicId: number;
}

export default function TimelineFeedbackModal({open, onOpenChange, topicId}: TimelineFeedbackModalProps) {
    const feedbackMutation = useTimelineFeedbackMutation({
        onSuccess: () => {
            onOpenChange(false);
        },
        onError: () => {
            onOpenChange(false);
        }
    });

    const handleFeedback = async (score: number | null) => {
        feedbackMutation.mutate({
            topicId,
            time: new Date().toISOString(),
            content: null,
            score
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
                <DialogFooter>
                    <Button
                        onClick={() => handleFeedback(5)}
                        disabled={feedbackMutation.isPending}
                    >
                        네!
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => handleFeedback(0)}
                        disabled={feedbackMutation.isPending}
                    >
                        아니요..
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}