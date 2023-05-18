import Link from 'next/link';
import Image from 'next/image';
import styles from './NavMenu.module.css';
import { SignInButton, SignOutButton } from '@/components/Buttons';
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import GuardedLink from '@/components/Guard'


export default async function NavMenu() {
    const session = await getServerSession(authOptions);

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
                    <Link href={'/blog'}> Blog </Link>

                </li>
                <li>
                    <Link href={'/users'}> Users </Link>
                </li>
                <li>
                    <GuardedLink session={session} href={'/dashboard'}> Dashboard </GuardedLink>
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
