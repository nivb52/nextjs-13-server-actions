// import type { Post } from '../../api/content/route';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

interface Props {
    params: { slug: string }
}

export const revalidate = 400; //seconds: 5*60
/** another option: SSG -> see readme */

export default async function BlogPostPage(req: Props) {
    const getPost = async (times = 5) => {
        if (times < 1) {
            throw new Error(`Bad argument: 'times' must be greater than 0, but ${times} was received.`);
        }

        let attemptCount = 0
        while (true) {
            try {
                return await prisma.post.findUnique({
                    where: { slug: req.params.slug }
                });
            } catch (err) {
                attemptCount++;
                if (attemptCount >= times) throw err;
                if (err instanceof Error && err.message.search(`Can't reach database server`) == -1) {
                    throw err
                }
            }
        }
    }

    const post = await getPost();
    if (!post || !post.title || !post.content) {
        console.log('404 - post not found');
        redirect('/404');
    }

    return (
        <div className='p-24 '>
            <h2 className='pb-5 text-7xl'>{post.title}</h2>
            <p className='first-letter:text-3xl'>{post.content}</p>
        </div>
    )
}