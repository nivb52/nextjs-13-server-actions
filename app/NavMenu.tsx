import Link from 'next/link';
import Image from 'next/image';
import styles from './NavMenu.module.css';
import { SignInButton, SignOutButton } from '@/components/Buttons';
import { getServerSession } from 'next-auth'
import { Suspense } from 'react';
import GuardedLink from '@/components/Guard'


export default async function NavMenu() {
    const session = await getServerSession();

    return (
        <nav className={styles.nav}>

            <Link href={'/'} >
                <Image className={styles.logo} src="logo.svg" alt="logo" width={30} height={30} />
            </Link>
            <ul className={styles.links}>

                <li>
                    <Link href={'/about'}> About </Link>
                </li>
                <li>
                    <GuardedLink session={session} href={'/blog'}> Blog </GuardedLink>

                </li>
                <li>
                    <Link href={'/users'}> Users </Link>
                </li>
                <li>
                    <SignInButton text={'sign in'} />
                </li>
                <li>
                    <SignOutButton text={'sign out'} />
                </li>
            </ul>

        </nav>
    );
}
