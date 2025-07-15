import {useMutation} from '@tanstack/react-query';
import {postTopicHistory} from '@/api/topicApi';

export const useTopicHistoryRecord = () => {
    return useMutation({
        mutationFn: postTopicHistory,
        onError: (error) => {
            console.error('Failed to record topic history:', error);
        }
    });
};
