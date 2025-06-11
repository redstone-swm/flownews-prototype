import {Calendar} from "lucide-react";

interface TopicBreadcrumbProps {
    category: string,
    subcategory: string
}

export default function Breadcrumbs({category, subcategory}: TopicBreadcrumbProps) {
    return (<div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
        <Calendar className="h-4 w-4"/>
        <span>{category}</span>
        <span>/</span>
        <span className="text-foreground font-medium">{subcategory}</span>
    </div>)
}