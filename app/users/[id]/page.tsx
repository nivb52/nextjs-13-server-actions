import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation';
import type { GetServerSidePropsContext } from 'next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Home(req: GetServerSidePropsContext["req"], res: GetServerSidePropsContext["res"]) {
    const session = await getServerSession(authOptions)
    console.log(session);
    if (!session) {
        redirect('/api/auth/signin');
    }

    return (
        <main>
            Users Page
        </main>
    )
} 