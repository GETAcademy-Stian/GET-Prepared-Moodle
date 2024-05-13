import Link from "next/link"
import { ArrowLeftIcon } from "@heroicons/react/16/solid"
import { blogPostData } from "@/lib/blogposts"

const blogPost = async ({params}: {params: {slug: string}}) => {
    const blogData = await blogPostData(params.slug);

    return (
        <section className="mx-auto w-10/12 md:w-1/2 mt-20 flex flex-col gap-5">
            <div className="flex justify-between">
                <Link href={"/"} className="flex flex-row gap-1 place-items-center">
                    <ArrowLeftIcon width={20}/>
                    <p>Back</p>
                </Link>
                <p>{blogData.date.toString()}</p>
            </div>
            <article className="blogPost" dangerouslySetInnerHTML={{__html: blogData.contentAsHtml}}/>
        </section>
    )
}

export default blogPost