import {useQuery} from "@tanstack/react-query";
import {fetchMainTopics} from "@/api/topicApi.tsx";

export const useMainTopics = () => {
    return useQuery({
        queryKey: ['topicList'],
        queryFn: fetchMainTopics,
    });
};