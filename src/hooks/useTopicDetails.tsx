import {useQuery} from '@tanstack/react-query';
import {fetchTopicDetails} from '../api/topicApi';

export const useTopicDetails = (id: number) => {
    return useQuery({
        queryKey: ['topicDetails', id],
        queryFn: () => fetchTopicDetails(id),
    });
};