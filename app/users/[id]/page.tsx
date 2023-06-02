import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import FollowButton from '@/components/FollowButton/FollowButton';
interface Props {
    params: { id: string }
    searchParams: {}
}

export async function generateMetadata(req: Props) {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    return { title: `User profile of ${user?.name}` }
}

export default async function Home(req: Props) {
    const session = await getServerSession(authOptions)

    if (!session) {
        console.log('this page require authentication')
        redirect('/api/auth/signin');
    }
    const user = await prisma.user.findUnique({
        where: { id: req.params.id },
        include: {
            followedBy: true
        }
    });

    if (!user) {
        console.log('404 - user not found');
        redirect('/404');
    }

    return (
        <main className='flex justify-center content-center'>
            <div className='pt-28'>
                <h1 className='title text-center text-4xl pt-4 pb-4'>{user.name}</h1>

                <img
                    width={300}
                    src={user.image ?? '/no-profile-picture-15257.svg'}
                    alt={`${user.name}'s profile`}
                />

                <h3 className='text-2xl underline pt-4 text-center'>Bio</h3>
                <p>{user.bio}</p>

                {/* @ts-expect-error- Server Component */}
                <FollowButton targetUserId={user.id} followedBy={user.followedBy || []} />
            </div>
        </main>
    )
}  