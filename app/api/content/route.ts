// Deprecated
import { NextResponse } from 'next/server';

export interface Post {
    title: string
    content: string
    slug: string
}
// Dummy data
const post = [
    {
        title: 'Ipsum',
        slug: 'ipsum',
        content:
            'Ipsum, ipsum, psum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
    },
    {
        title: 'Lorem',
        slug: 'lorem',
        content:
            'Lorem, lorem, orem dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
    },
];
export async function GET() {

    // const post = await prisma.post.findUnique({
    //     where: { id: req.params.id }
    // });
    return NextResponse.json(post);
}
