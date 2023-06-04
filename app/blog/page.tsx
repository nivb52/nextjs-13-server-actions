import prisma from '@/lib/prisma';
import { retryQuery } from "@/lib/utils/asyncRetry";
import PostCard from '@/components/PostCard/PostCard'

export default async function Blog() {

    const getPosts = async () => await prisma.post.findMany({
        take: 10, select: {
            slug: true,
            id: true,
            title: true,
            createdAt: true,
            author: {
                select: {
                    image: true,
                    name: true,
                }
            },
            content: false,
            likes: {
                select: {
                    userId: true
                }
            }
        },
        where: {
            isPublished: {
                equals: true
            }
        }
    });
    const posts: Awaited<ReturnType<typeof getPosts>> = await retryQuery(getPosts, 3);
    if (!posts || !posts.length) {
        return (
            <div>no data</div>
        )
    }

    return (
        <main className=''>
            <h1 className='text-4xl text-center pt-4'>
                Our Blog
            </h1>


            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -mx-4 -my-8">
                        {posts.map((post) => {
                            return (
                                <div className="py-8 px-4 lg:w-1/3">
                                    <PostCard key={post.id} post={post} />
                                </div>
                            )
                        })}

                    </div>
                </div>
            </section>
        </main>
    )
}
