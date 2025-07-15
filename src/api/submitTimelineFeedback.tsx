import type {TimelineFeedbackRequest, TopicSuggestionFeedbackRequest} from "@/types/topic.ts";
import axiosInstance from "@/api/axiosInstance.tsx";

export const submitTimelineFeedback = async (feedback: TimelineFeedbackRequest) => {
    const response = await axiosInstance.post(`/logs/feedback`, feedback);
    return response.data;
};

export const submitTopicSuggestionFeedback = async (feedback: TopicSuggestionFeedbackRequest) => {
    const response = await axiosInstance.post(`/logs/topic-suggestion`, feedback);
    return response.data;
}
