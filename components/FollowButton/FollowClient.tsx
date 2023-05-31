'use client'

import { useState, useTransition } from "react";
import { useRouter } from 'next/navigation';

interface Props {
    isFollowing?: boolean;
    targetUserId: string;
}
export default function FollowClient({ isFollowing, targetUserId }: Props) {
    const [isPending, startTransition] = useTransition();
    const [isFetching, setIsFetching] = useState(false);
    const isMutating = isFetching || isPending;
    const router = useRouter();

    const toggleFollow = async () => {
        setIsFetching(true)
        try {
            const res = isFollowing ? await unfollow(targetUserId) : await follow(targetUserId)
            console.log(res);
            startTransition(() => {
                // - Sends the updated React Server Component payload to the client
                // - The client merges the payload without losing unaffected
                //   client-side React state or browser state
                router.refresh();
            });

            if (!res.ok) {
                alert('FAILED');
            }
        } catch (err) {
            console.error('Failed to toggle follow');
            alert('FAILED');
        } finally {
            setIsFetching(false);
        }
    }

    const follow = async (targetUserId: string) => {
        return await fetch('/api/follow', {
            method: 'POST',
            body: JSON.stringify({ targetUserId }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const unfollow = async (targetUserId: string) => {
        return await fetch(`/api/follow?targetUserId=${targetUserId}`, {
            method: 'DELETE',
        });
    }


    return (
        <>
            <button className={`
            bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                ${isMutating ? 'opacity-50 cursor-not-allowed' : ''}
            `}
                onClick={toggleFollow}>
                {isMutating ? '... Loading ...' : isFollowing ? 'Unfollow' : 'Follow'}
            </button>
        </>
    )


}