export interface Event {
    id: number;
    title: string;
    description?: string;
    imageUrl?: string;
    eventTime: string;
}

export interface TopicDetails {
    id: number;
    title: string;
    description?: string;
    imageUrl: string;
    events: Event[];
}

export interface TopicSummary {
    id: number;
    title: string;
    description?: string;
    imageUrl: string;
}

export interface TopicSubscribeRequest {
    topicId: number;
    deviceToken: string;
}

export interface TimelineFeedbackRequest {
    topicId: number;
    time: string;
    content: string | null;
    score: number | null; // 네:5, 아니오:0, 응답안하고 닫음:null
}
