import BlogPostItemList from "@/components/BlogPostListItem";
import { categorizeBlogPosts } from "@/lib/blogposts"

const HomePage = () => {
  const blogPosts = categorizeBlogPosts();

  return (
    <section className="mx-auto w-11/1 md:w-1/2 mt-20 flex flex-col gap-16 mb-20">
      <header className="font-light text-6xl txt-neutral-900 text-center">
        <h1>Min blogg</h1>
      </header>
      <section className="md:grid md:grid-cols-2 flex flex-col gap-10">
        {blogPosts !== null && Object.keys(blogPosts).map(blogPost => (
          <BlogPostItemList category={blogPost} blogPosts={blogPosts[blogPost]} key={blogPost}/>
        ))}
      </section>
    </section>
  )
}

export default HomePage