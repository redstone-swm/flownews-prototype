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

export interface TopicSubscribeRequest{
    topicId: number;
    visitorId?: string;
    userAgent: string;
    token?: string;
}