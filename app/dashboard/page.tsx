import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import ProfileForm from './ProfileForm';


export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        console.log("this souldn't be possible because we add this route as Guarded");
        redirect('/api/auth/signin')
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user?.email
        }
    });
    if (!user) {
        redirect('/404')
    }

    return (
        <main className=''>
            <h1 className='text-4xl text-center pt-4'>
                Dashboard
            </h1>

            <ProfileForm user={user} />
        </main>
    )


}