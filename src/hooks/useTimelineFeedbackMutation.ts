import {useMutation} from '@tanstack/react-query';
import {submitTimelineFeedback} from '@/api/topicApi';
import type {TimelineFeedbackRequest} from '@/types/topic';

interface UseTimelineFeedbackMutationOptions {
    onSuccess?: () => void;
    onError?: (error: any) => void;
}

export const useTimelineFeedbackMutation = (options?: UseTimelineFeedbackMutationOptions) => {
    return useMutation({
        mutationFn: (feedback: TimelineFeedbackRequest) => submitTimelineFeedback(feedback),
        onSuccess: () => {
            options?.onSuccess?.();
        },
        onError: (error) => {
            console.error('피드백 제출 중 오류 발생:', error);
            options?.onError?.(error);
        },
    });
};
