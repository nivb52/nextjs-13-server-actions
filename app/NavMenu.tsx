import Link from 'next/link';
import Image from 'next/image';
import styles from './NavMenu.module.css';

export default function NavMenu() {
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
            </ul>

        </nav>
    );
}
