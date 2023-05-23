import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

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

    const data: { age: string, bio: string, email: string, name: string, image: string } = await req.json();
    const age = Number(data.age);
    const image = data.image.match(/(http(s?):)([\/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/g);
    const extractedImage = image?.length ? image[0] : data.image;
    const user = await prisma.user.update({
        where: {
            email: currEmail
        },
        data: {
            age,
            image: extractedImage,
            name: data.name,
            bio: data.bio
        }
    });


    return NextResponse.json(user);
}
