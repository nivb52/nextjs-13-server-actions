'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';


type Props = {
  text: string
}
export function SignInButton({ text = 'Log In' }: Props) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <>...</>;
  }

  if (status === 'authenticated') {
    return (
      <Link href={'/dashboard'}>
        <Image
          src={session.user?.image ?? '/no-profile-picture-15257.svg'}
          width={32}
          height={32}
          alt="User Image"
        />
      </Link>
    );
  }

  return <button role='button' data-css="auth" onClick={() => signIn}>{text}</button>;
}

export function SignOutButton({ text = 'Log Out' }: Props) {
  return <button role='button' data-css="auth" onClick={() => signOut}>{text}</button>;
}
