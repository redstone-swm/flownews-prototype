import {useQuery} from "@tanstack/react-query";
import {fetchTopicList} from "@/api/topicApi.tsx";

export const useTopicList = () => {
    return useQuery({
        queryKey: ['topicList'],
        queryFn: fetchTopicList,
    });
};