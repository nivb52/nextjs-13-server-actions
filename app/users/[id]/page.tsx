import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

interface Props {
    params: { id: string }
    searchParams: {}
}

export async function generateMetadata(req: Props) {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    return { title: `User profule of ${user?.name}` }
}

export default async function Home(req: Props) {
    const session = await getServerSession(authOptions)

    if (!session) {
        alert('this page require authentication')
        redirect('/api/auth/signin');
    }
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });

    if (!user) {
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

            </div>
        </main>
    )
}  