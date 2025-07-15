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
import {useTimelineFeedbackMutation} from "@/hooks/useTimelineFeedbackMutation.ts";
import {useTopicSuggestionFeedbackMutation} from "@/hooks/useTopicSuggestionFeedbackMutation.ts";

interface TopicSuggestionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const TopicSuggestionModal = ({open, onOpenChange}: TopicSuggestionModalProps) => {
    const [ipAddress, setIpAddress] = useState<string>("");
    const [topicSuggestion, setTopicSuggestion] = useState<string>("");

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
        },
        onError: () => {
            onOpenChange(false);
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

    return (
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
    );
};
