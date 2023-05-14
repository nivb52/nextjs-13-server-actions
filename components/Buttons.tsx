'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';


type Props = {
  text: string
}
export function SignInButton({ text = 'Log In' }: Props) {
  const { data: session, status } = useSession();
  const doSignIn = () => {
    console.log('signing in ...');
    signIn();
  };

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

  return <button role='button' data-css="auth" onClick={doSignIn}>{text}</button>;
}

export function SignOutButton({ text = 'Log Out' }: Props) {
  const doSignOut = () => {
    console.log('signing out ...');
    signOut()
  }
  return <button role='button' data-css="auth" onClick={doSignOut}>{text}</button>;
}
