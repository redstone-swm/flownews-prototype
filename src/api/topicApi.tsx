import axiosInstance from './axiosInstance';
import type {TopicDetails, TopicSummary} from "@/types/topic.ts";

export const fetchTopicDetails = async (id: number): Promise<TopicDetails> => {
    const response = await axiosInstance.get<TopicDetails>(`/topics/${id}`);
    return response.data;
};

export const fetchTopicList = async (): Promise<TopicSummary[]> => {
    const response = await axiosInstance.get<TopicSummary[]>('/topics');
    return response.data;
};