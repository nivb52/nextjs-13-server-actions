import styles from './Users.module.css';

import prisma from '@/lib/prisma';
import UserCard from '@/components/UserCard/UserCard';

export default async function Users() {
    const users = await prisma.user.findMany({});
    if (!users || !users.length) {
        return (
            <div>no data</div>
        )
    }
    return (
        <div className={styles.grid}>
            {users.map((user) => {
                return <UserCard key={user.id} {...user} />
            })}
        </div>
    )
}