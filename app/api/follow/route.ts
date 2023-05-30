import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';


export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    const currEmail = session?.user?.email;
    const { targetUserId: targetUserIdReq } = await req.json();
    let validUserIds;
    try {
        validUserIds = await getUserIds(currEmail, targetUserIdReq)
    } catch (err) {
        console.error(err);
        return NextResponse.error();
    }

    try {
        const { currUserId, targetUserId } = validUserIds;
        const record = await prisma.follows.create({
            data: {
                followerId: currUserId,
                followingId: targetUserId
            }
        });
        return NextResponse.json(record).ok;
    } catch (err) {
        console.error(err);
        return NextResponse.error();
    }
}


export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const currEmail = session?.user?.email;
    const targetUserIdParam = req.nextUrl.searchParams.get('targetUserId');

    let validUserIds;
    try {
        validUserIds = await getUserIds(currEmail, targetUserIdParam)
    } catch (err) {
        console.error(err);
        return NextResponse.error();
    }

    try {
        const { currUserId, targetUserId } = validUserIds;
        const record = await prisma.follows.delete({
            where: {
                followerId_followingId: {
                    followerId: currUserId,
                    followingId: targetUserId

                }
            }
        });
        return NextResponse.json(record).ok;

    } catch (err) {
        console.error(err);
        return NextResponse.error();
    }
}

type StringMaybe = string | null | undefined;
const getUserIds = async (
    currEmail: StringMaybe,
    targetUserIdParam: StringMaybe,
): Promise<{ currUserId: string, targetUserId: string }> => {
    if (!currEmail || !targetUserIdParam) {
        throw new Error(`MISSING PARAMETER/S: ${currEmail ? 'User Id' : 'Email'} `)
    }

    const currUserP = prisma.user.findUnique({
        where: {
            email: currEmail
        },
        select: {
            id: true
        }
    }).then(user => user?.id);

    const targetUserP = prisma.user.findUnique({
        where: {
            id: targetUserIdParam
        },
        select: {
            id: true
        }
    }).then(user => user?.id);

    const [currUserId, targetUserId] = await Promise.all([currUserP, targetUserP]);
    if (!currUserId || !targetUserId) {
        throw new Error('NOT FOUND')
    }

    return { currUserId, targetUserId }
}