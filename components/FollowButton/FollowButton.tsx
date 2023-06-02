import prisma from '@/lib/prisma';
import { getServerSession, Session } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import type { Follows } from "@/lib/prisma";
import FollowClient from '@/components/FollowButton/FollowClient';

interface Props {
    targetUserId: string;

    isFollowing?: boolean;
    followedBy?: [typeof Follows] | [] | undefined;
    session?: Session
}

export default async function FollowButton(props: Props) {
    let isFollowing;
    const session = props.session || await getServerSession(authOptions);
    const currentUserId = await prisma.user.findUnique({
        where: {
            email: session?.user?.email!
        },
        select: {
            id: true
        }
    }).then(rec => rec?.id);

    if (!currentUserId) {
        console.log('this page require authentication')
        redirect('/api/auth/signin');
    }

    if (!props.targetUserId) {
        console.log('404 - targetUserId not found');
        redirect('/404');
    }

    // scenrio A: used without extra data of followedBy
    if (props.followedBy === undefined) {
        isFollowing = await prisma.follows.findFirst({
            where: { followerId: currentUserId, followingId: props.targetUserId },
            select: { followingId: true }
        }).then(rec => rec?.followingId);
    } else {
        // scenrio B: used with followedBy data
        isFollowing = props.followedBy
            .findIndex(follow => follow.followerId === currentUserId) > -1;
    }

    return (
        <FollowClient isFollowing={!!isFollowing} targetUserId={props.targetUserId} />
    );
}