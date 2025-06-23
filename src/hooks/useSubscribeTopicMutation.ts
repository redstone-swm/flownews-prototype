import {useMutation} from "@tanstack/react-query";
import {subscribeTopic} from "@/api/topicApi.tsx";

export function useSubscribeTopicMutation() {
    return useMutation({
        mutationFn: subscribeTopic
    });
}