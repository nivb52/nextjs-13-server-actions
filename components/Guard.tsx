import { getServerSession } from 'next-auth'
import Link from 'next/link';

type Props = {
    session: ReturnType<(<getServerSession>() => getServerSession)>
    href: string
    text?: string
    children: React.ReactNode
}

export default function GuardedLink({ session, href, text, children }: Props) {
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