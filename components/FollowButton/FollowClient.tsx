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
        const res = isFollowing ? await unfollow(targetUserId) : await follow(targetUserId)
        console.log(res);

        setIsFetching(false);
        startTransition(() => {
            router.refresh();
        });
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