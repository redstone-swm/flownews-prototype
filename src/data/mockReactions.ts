import type {ReactionSummaryResponse} from "@/api/models";

export const mockReactions: ReactionSummaryResponse[] = [
  {
    reactionTypeId: 1,
    count: 42,
    isActive: false
  },
  {
    reactionTypeId: 2,
    count: 15,
    isActive: false
  },
  {
    reactionTypeId: 3,
    count: 8,
    isActive: true
  }
];