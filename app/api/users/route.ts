import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import type { User, UserUpdate } from './types';

export async function GET(req: Request) {
    const users = await prisma.user.findMany();

    return NextResponse.json(users)
}


export async function PUT(req: Request) {
    //auth
    const session = await getServerSession(authOptions);
    const currEmail = session?.user?.email;

    if (!currEmail) {
        return NextResponse.error();
    }

    const data: User = await req.json();
    const age = Number(data.age);
    const image = data.image.match(/(http(s?):)([\/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/g);
    const validImage = image?.length ? image[0] : undefined;

    const newData: UserUpdate = {
        age,
        name: data.name,
        bio: data.bio
    };

    if (validImage) {
        newData.image = validImage;
    }

    const user = await prisma.user.update({
        where: {
            email: currEmail
        },
        data: newData
    });


    return NextResponse.json(user);
}
