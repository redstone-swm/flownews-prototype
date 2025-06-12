import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface TopicBreadcrumbProps {
    category: string;
    subcategory: string;
}

export function TopicBreadcrumb({ category, subcategory }: TopicBreadcrumbProps) {
    return (
        <Breadcrumb className="py-3">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">{category}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <BreadcrumbPage>{subcategory}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
