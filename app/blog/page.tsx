import prisma from '@/lib/prisma';
import Link from 'next/link';


export default async function Blog() {
    const posts = await prisma.post.findMany({
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
                    isLike: true
                }
            }
        },
        where: {
            isPublished: {
                equals: true
            }
        }
    });

    if (!posts || !posts.length) {
        return (
            <div>no data</div>
        )
    }

    return (
        <main className=''>
            <h1 className='text-4xl text-center pt-4'>
                Blog
            </h1>

            <div className="grid grid-cols-3 gap-5 mt-8">
                {posts.map((post) => {
                    return (

                        <div key={post.id} className="mb-6">
                            <Link href={`/blog/${post.slug}`}>
                                <h1 className='text-2xl' >{post.title}</h1>
                            </Link >
                            <p>By {post.author.name}</p>
                            <p>
                                {new Date(post.createdAt).toLocaleString()}
                                <img
                                    width={25}
                                    src={post.author.image ?? '/no-profile-picture-15257.svg'}
                                    alt={`${post.author.name}'s profile`}
                                />
                            </p>

                        </div>
                    )
                })}
            </div>
        </main>
    )


}