import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArticleViewer } from '@/components/article/ArticleViewer'

export const Route = createFileRoute('/article/$articleUrl')({
  component: ArticlePage,
  validateSearch: (search: Record<string, unknown>): {
    title?: string
    source?: string
    eventTitle?: string
  } => {
    return {
      title: typeof search.title === 'string' ? search.title : undefined,
      source: typeof search.source === 'string' ? search.source : undefined,
      eventTitle: typeof search.eventTitle === 'string' ? search.eventTitle : undefined,
    }
  },
})

function ArticlePage() {
  const { articleUrl } = Route.useParams()
  const { title, source, eventTitle } = Route.useSearch()
  const navigate = useNavigate()

  // URL 디코딩
  const decodedUrl = decodeURIComponent(articleUrl)

  const handleClose = () => {
    navigate({ to: '/' })
  }

  const handleBack = () => {
    window.history.back()
  }

  return (
    <ArticleViewer
      url={decodedUrl}
      title={title || '기사'}
      source={eventTitle || source || ''}
      onClose={handleClose}
      onBack={handleBack}
    />
  )
}