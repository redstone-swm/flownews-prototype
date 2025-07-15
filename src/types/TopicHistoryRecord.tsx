export interface TopicHistoryRecordRequest {
    /*
    val topicId: Long,
    val eventId: Long,
    val ipAddress: String,
    val elapsedTime: Int,
    val direction: String
     */
    topicId: number;
    eventId: number | null; // 표지만 보고 넘긴 경우 null
    ipAddress: string;
    elapsedTime: number; // in seconds
    direction: 'forward' | 'backward' | 'downward' | 'upward';
}