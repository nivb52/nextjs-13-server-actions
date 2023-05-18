import Link from 'next/link';
import { Session } from 'next-auth'

type Props = {
    session: Session | null
    href: string
    text?: string
    children: React.ReactNode
}

export default function GuardedLink({ session, href, text, children }: Props) {
    console.info(session, 'session');

    if (session) {
        return (
            <Link href={href}>
                {text}
                {children}
            </Link>
        );
    } else {
        return <Link href={'/api/auth/signin'}> {text}{children} </Link>;
    }
}