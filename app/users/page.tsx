import styles from './Users.module.css';

import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import UserCard from '@/components/UserCard/UserCard';

export default async function Users() {
    // const session = await getServerSession();
    // if (!session) {
    //     console.log('no session', session);
    //     redirect('/api/auth/signin');
    // }

    const users = await prisma.user.findMany();

    return (
        <div className={styles.grid}>
            {users.map((user) => {
                return <UserCard key={user.id} {...user} />
            })}
        </div>
    )
}