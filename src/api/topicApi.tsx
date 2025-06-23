import axiosInstance from './axiosInstance';
import type {TopicDetails, TopicSubscribeRequest, TopicSummary} from "@/types/topic.ts";

export const fetchTopicDetails = async (id: number): Promise<TopicDetails> => {
    const response = await axiosInstance.get<TopicDetails>(`/topics/${id}`);
    return response.data;
};

export const fetchTopicList = async (): Promise<TopicSummary[]> => {
    const response = await axiosInstance.get<TopicSummary[]>('/topics');
    return response.data;
};

export const subscribeTopic = async (req: TopicSubscribeRequest) => {
    const {data} = await axiosInstance.post(`/topics/${req.topicId}/subscribe`, req);
    return data;
}