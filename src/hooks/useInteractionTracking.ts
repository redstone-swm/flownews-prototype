import { useCallback, useEffect, useRef } from 'react';
import { useRecordInteraction } from '../api/user-event-interactions/user-event-interactions';
import { InteractionRecordRequestInteractionType } from '../api/models/interactionRecordRequestInteractionType';

export interface PendingInteraction {
  eventId: number;
  interactionType: InteractionRecordRequestInteractionType;
  additionalData?: string;
}

export const useInteractionTracking = () => {
  const recordInteractionMutation = useRecordInteraction();
  const pendingInteractionsRef = useRef<PendingInteraction[]>([]);

  const addPendingInteraction = useCallback((interaction: PendingInteraction) => {
    const existingIndex = pendingInteractionsRef.current.findIndex(
      p => p.eventId === interaction.eventId && p.interactionType === interaction.interactionType
    );
    
    if (existingIndex >= 0) {
      pendingInteractionsRef.current[existingIndex] = interaction;
    } else {
      pendingInteractionsRef.current.push(interaction);
    }
  }, []);

  const flushPendingInteractions = useCallback(async () => {
    const interactions = [...pendingInteractionsRef.current];
    pendingInteractionsRef.current = [];

    for (const interaction of interactions) {
      try {
        await recordInteractionMutation.mutateAsync({ data: interaction });
      } catch (error) {
        console.error('Failed to record interaction:', error);
        pendingInteractionsRef.current.push(interaction);
      }
    }
  }, [recordInteractionMutation]);

  const trackInteraction = useCallback((
    eventId: number,
    interactionType: InteractionRecordRequestInteractionType,
    additionalData?: string
  ) => {
    addPendingInteraction({ eventId, interactionType, additionalData });
  }, [addPendingInteraction]);

  const trackViewed = useCallback((eventId: number, additionalData?: string) => {
    trackInteraction(eventId, InteractionRecordRequestInteractionType.VIEWED, additionalData);
  }, [trackInteraction]);

  const trackArticleClicked = useCallback((eventId: number, additionalData?: string) => {
    trackInteraction(eventId, InteractionRecordRequestInteractionType.ARTICLE_CLICKED, additionalData);
  }, [trackInteraction]);

  const trackTopicViewed = useCallback((eventId: number, additionalData?: string) => {
    trackInteraction(eventId, InteractionRecordRequestInteractionType.TOPIC_VIEWED, additionalData);
  }, [trackInteraction]);

  const trackTopicFollowed = useCallback((eventId: number, additionalData?: string) => {
    trackInteraction(eventId, InteractionRecordRequestInteractionType.TOPIC_FOLLOWED, additionalData);
  }, [trackInteraction]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      flushPendingInteractions();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushPendingInteractions();
      }
    };

    const handlePageHide = () => {
      flushPendingInteractions();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);

    const intervalId = setInterval(() => {
      if (pendingInteractionsRef.current.length > 0) {
        flushPendingInteractions();
      }
    }, 5000);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      clearInterval(intervalId);
      flushPendingInteractions();
    };
  }, [flushPendingInteractions]);

  return {
    trackViewed,
    trackArticleClicked,
    trackTopicViewed,
    trackTopicFollowed,
    flushPendingInteractions,
  };
};