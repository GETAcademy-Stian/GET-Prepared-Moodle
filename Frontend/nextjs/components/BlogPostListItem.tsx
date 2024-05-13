import Link from "next/link"
import type { BlogPost } from "@/types"

interface Props {
    category: string;
    blogPosts: BlogPost[];
}

const BlogPostItemList = ({category, blogPosts}: Props) => {
    return (
        <div className="flex flex-col gap-5">
            <h2 className="text-4xl">{category}</h2>
            <div className="flex flex-col gap-2.5 text-lg">
                {blogPosts.map((blogPost, id) => (
                        <Link href={`/${blogPost.id}`} key={id} className="text-neutral-900 hover:text-amber-700 transition-duration-150">
                            {blogPost.title}
                        </Link>
                ))}
            </div>
        </div>
    )
}

export default BlogPostItemList;