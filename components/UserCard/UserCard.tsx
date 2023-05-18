import styles from './UserCard.module.css';

import type { Prisma } from "@prisma/client";
import Link from 'next/link';

interface Props {
    // data: Prisma.UserSelect,
    id: string;
    name: string | null;
    age: number | null;
    image: string | null;
}

export default function UserCard({ id, name, age, image }: Props) {
    return (
        <Link href={`/users/${id}`}>
            <div className={styles.card}>
                <img
                    src={image ?? '/no-profile-picture-15257.svg'}
                    alt={`${name}'s profile`}
                    className={styles.cardImage}
                />
                <div className={styles.cardContent}>
                    <h3 className={styles.title}>
                        {name}
                    </h3>
                    <p>Age: {age}</p>
                </div>
            </div>
        </Link >
    );
}