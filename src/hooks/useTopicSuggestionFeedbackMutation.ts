import {useMutation} from '@tanstack/react-query';
import type {TopicSuggestionFeedbackRequest} from '@/types/topic';
import {submitTopicSuggestionFeedback} from "@/api/submitTimelineFeedback.tsx";

interface UseTopicSuggestionFeedbackMutationOptions {
    onSuccess?: () => void;
    onError?: (error: any) => void;
}

export const useTopicSuggestionFeedbackMutation = (options?: UseTopicSuggestionFeedbackMutationOptions) => {
    return useMutation({
        mutationFn: (feedback: TopicSuggestionFeedbackRequest) => submitTopicSuggestionFeedback(feedback),
        onSuccess: () => {
            options?.onSuccess?.();
        },
        onError: (error) => {
            console.error('피드백 제출 중 오류 발생:', error);
            options?.onError?.(error);
        },
    });
};
