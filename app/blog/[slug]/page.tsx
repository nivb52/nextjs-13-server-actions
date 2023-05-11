import type { Post } from '../../api/content/route';
import getConfig from '@/app/config/development';
interface Props {
    params: { slug: string }
}
const config = getConfig();


export const revalidate = 400; //seconds: 5*60

/** another option: SSG */
/*
export async function generateStaticParams() {
    try {
        const posts: Post[] = await fetch(config.api + '/content')
            .then(res => {
                return res.json()
            });
        return posts.map(post => { slug: post.slug });
    } catch (err) {
        console.error('error: retriving data for Blog, ', err);
    }
}
 */
export default async function BlogPostPage({ params }: Props) {
    console.log('config', config);
    let post, posts: Post[] | undefined
    try {
        posts = await fetch(config.api + '/content')
            .then(res => {
                return res.json()
            });
    } catch (err) {
        console.error('error: retriving data for Blog post slug: ', params.slug, ' err:', err);
    }

    if (posts) {
        post = posts.find(p => p.slug === params.slug);
    }

    if (!post) {
        return (
            <div>
                No Data
            </div>
        )
    }

    return (
        <div className='p-24 '>
            <h2 className='pb-5 text-7xl'>{post.title}</h2>
            <p className='first-letter:text-3xl'>{post.content}</p>
        </div>
    )

}