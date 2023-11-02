import { getCollection } from "astro:content"

export const usePosts = async () => {
  const posts = await getCollection("blog")
  posts.sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf())

  const formattedPosts = posts.map((post) => ({
    id: post.id,
    title: post.data.title,
    thumbnail: post.data.heroImage ?? "",
    date: new Date(post.data.pubDate).toLocaleDateString(),
    category: post.data.category,
  }))

  const categories = [...new Set(formattedPosts.map((post) => post.category))]

  return {
    posts: formattedPosts,
    categories,
  }
}
