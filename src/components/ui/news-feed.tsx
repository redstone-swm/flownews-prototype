import { NewsCard } from './news-card';

interface NewsItem {
  id: string;
  topic: string;
  date: string;
  time: string;
  title: string;
  content: string;
  tags: string[];
  likeCount: string;
  isSubscribed?: boolean;
  imageUrl?: string;
  topicId?: string;
}

interface NewsFeedProps {
  newsItems?: NewsItem[];
  onAddToInterest?: (itemId: string) => void;
  onLike?: (itemId: string) => void;
  onShare?: (itemId: string) => void;
}

const defaultNewsItems: NewsItem[] = [
  {
    id: '1',
    topic: '2025년 뉴진스 컴백',
    date: '2025년 9월 23일',
    time: '오전 10:30',
    title: '뉴진스, 새로운 앨범(어텐션) 발표',
    content: '걸그룹 뉴진스(NewJeans)가 새로운 앨범 Attention을 발표했습니다. 이번 앨범은 뉴진스 특유의 청량하고 자유로운 감성을 담아내며, 데뷔 초부터 이어온 독창적인 음악 색깔을 한층 더 확장한 것이 특징입니다. 타이틀곡은 리드미컬한 멜로디와 중독성 있는 후렴구로 팬들의 큰 관심을 받고 있으며, 앨범 전체적으로는 R&B, 팝, 하우스 등 다양한 장르를 넘나드는 실험적인 시도가 돋보입니다.',
    tags: ['뉴진스', '어텐션', 'K-POP'],
    likeCount: '841',
    isSubscribed: false,
    imageUrl: 'https://picsum.photos/400/200?random=1',
    topicId: '1'
  },
  {
    id: '2',
    topic: '2025년 뉴진스 컴백',
    date: '2025년 9월 23일',
    time: '오후 1:07',
    title: 'U-20 월드컵 28일 칠레서 개막',
    content: "'차세대 축구스타들의 무대'인 2025 FIFA 20세 이하(U-20) 월드컵이 28일부터 10월 20일까지 칠레에서 열린다.\n\n이번 대회는 6개 대륙(아시아 4팀·아프리카 4팀·북중미 4팀·남미 4팀·오세아니아 2팀·유럽 5팀)을 대표하는 24개 팀이 참여한다. 한국시간으로 28일 오전 5시에 킥오프하는 조별리그 A조 일본 vs 이집트(산티아고)과 B조 한국 vs 우크라이나(발파라이소)의 개막전을 시작으로 22일간의 열전이 펼쳐진다.",
    tags: ['뉴진스', '어텐션', 'K-POP'],
    likeCount: '3K',
    isSubscribed: true,
    imageUrl: 'https://picsum.photos/400/200?random=2',
    topicId: '1'
  },
  {
    id: '3',
    topic: '2025년 뉴진스 컴백',
    date: '2025년 9월 23일',
    time: '오전 5:57',
    title: '美 증시 사흘째 하락',
    content: '25일(현지시간) 뉴욕증권거래소(NYSE)에서 블루칩을 모아놓은 다우존스30 산업평균지수는 전장보다 0.38% 내린 4만5947.32를 기록. 대형주 벤치마크인 S&P500 지수는 0.50% 떨어진 6604.72를, 기술주 중심의 나스닥지수는 0.50% 하락한 2만2384.698에 거래를 마쳐. 3대지수 모두 사상 최고치 행진 이후 3거래일 연속 하락하면서 한달 만에 가장 긴 약세를 기록',
    tags: ['뉴진스', '어텐션', 'K-POP'],
    likeCount: '73',
    isSubscribed: false,
    imageUrl: 'https://picsum.photos/400/200?random=3',
    topicId: '1'
  }
];

export function NewsFeed({ 
  newsItems = defaultNewsItems, 
  onAddToInterest, 
  onLike, 
  onShare 
}: NewsFeedProps) {
  return (
    <div className="flex flex-col gap-[12px] items-center w-full sm:gap-4 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {newsItems.map((item) => (
        <NewsCard
          key={item.id}
          topic={item.topic}
          date={item.date}
          time={item.time}
          title={item.title}
          content={item.content}
          tags={item.tags}
          likeCount={item.likeCount}
          isSubscribed={item.isSubscribed}
          imageUrl={item.imageUrl}
          topicId={item.topicId}
          onAddToInterest={() => onAddToInterest?.(item.id)}
          onLike={() => onLike?.(item.id)}
          onShare={() => onShare?.(item.id)}
        />
      ))}
    </div>
  );
}