interface NewsCardProps {
    title: string;
    subtitle: string;
    imageUrl: string;
    align?: 'left' | 'right';
    onClick?: () => void;
}

export default function NewsCard({
                                     title,
                                     subtitle,
                                     imageUrl,
                                     onClick,
                                 }: NewsCardProps) {
    return (
        <div
            className="w-full    cursor-pointer"
            onClick={onClick}
        >
            <div className="mb-0.5">
                <img
                    src={imageUrl}
                    alt={title}
                    className="rounded-sm w-full"
                />
            </div>
            <div className={`text-right`}>
                <p className="text-2xl font-bold">{title}</p>
                <p className="text-sm  text-gray-500 -mt-0.5">{subtitle}</p>
            </div>
        </div>
    );
}
