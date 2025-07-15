import axiosInstance from './axiosInstance';
import type {
    TopicDetails,
    TopicSubscribeRequest,
    TimelineFeedbackRequest,
    TopicMainData
} from "@/types/topic.ts";
import type {TopicHistoryRecordRequest} from "@/types/TopicHistoryRecord.tsx";

export const fetchTopicDetails = async (id: number): Promise<TopicDetails> => {
    const response = await axiosInstance.get<TopicDetails>(`/topics/${id}`);
    return response.data;
};

export const fetchMainTopics = async (): Promise<TopicMainData> => {
    const response = await axiosInstance.get<TopicMainData>('/topics?for=main');
    return response.data;
};

export const subscribeTopic = async (req: TopicSubscribeRequest) => {
    const {data} = await axiosInstance.post(`/topics/${req.topicId}/subscribe`, req);
    return data;
}

export const submitTimelineFeedback = async (feedback: TimelineFeedbackRequest) => {
    const response = await axiosInstance.post(`/logs/feedback`, feedback);
    return response.data;
};

export const postTopicHistory = async (req: TopicHistoryRecordRequest) => {
    const {data} = await axiosInstance.post(`/topics/${req.topicId}/read`, req);
    return data;
}