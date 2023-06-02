// import type { Post } from '../../api/content/route';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

interface Props {
    params: { slug: string }
}

export const revalidate = 400; //seconds: 5*60
/** another option: SSG -> see readme */

export default async function BlogPostPage(req: Props) {
    const post = await prisma.post.findUnique({
        where: { slug: req.params.slug }
    });

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