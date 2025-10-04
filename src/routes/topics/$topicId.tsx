import { createFileRoute } from '@tanstack/react-router'
import TopicDetailsPage from '@/pages/TopicDetailsPage'

export const Route = createFileRoute('/topics/$topicId')({
  component: TopicDetailsPage,
})