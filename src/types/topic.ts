export interface Event {
    id: number;
    title: string;
    description?: string;
    imageUrl?: string;
    eventTime: string;
    relatedLinks?: string[];
}

export interface TopicDetails {
    id: number;
    title: string;
    description?: string;
    imageUrl: string;
    events: Event[];
    recommendTopics: TopicSummary[];
}

export interface TopicSummary {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

export interface TopicMainData {
    sections: TopicSection[];
}

export interface TopicSection {
    title: string;
    topics: TopicSummary[];
}

export interface TopicSubscribeRequest {
    topicId: number;
    deviceToken: string;
}

export interface TimelineFeedbackRequest {
    ipAddress: string;
    topicId: number;
    time: string;
    content: string | null;
    score: number | null; // 네:5, 아니오:0, 응답안하고 닫음:null
}

export interface TopicSuggestionFeedbackRequest {
    ipAddress: string;
    time: string;
    content: string;
}