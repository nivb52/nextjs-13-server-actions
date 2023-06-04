"use server";
import prisma from '@/lib/prisma';
import { retryQuery } from "@/lib/utils/asyncRetry";
import { DefaultSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { isString } from '@/lib/utils/validation';
import { revalidatePath } from 'next/cache';


export const upVotePost = async (formData: FormData) => {
    const slug = formData.get('postSlug');
    const { data, info, code } = await doUpVotePost(formData);
    switch (code) {
        case 404:
            redirect('/404');
            break;
        case 409:
            // return NextResponse.json({ info, code });
            return ({ info, code });
            break;
        case 200:
            revalidatePath(`/blog/${slug}/`);
            break;

        default:
            break;
    }
}

async function doUpVotePost(formData: FormData) {

    const postId = formData.get("postId");
    const postSlug = formData.get("postSlug");
    const currEmail = formData.get("user");
    if (!isString(postId) || !isString(postSlug) || !isString(currEmail)) {
        console.log('404 - post not found');
        redirect('/404');
    }

    const getPost = async () => await prisma.post.findUnique({
        where: { id: postId as string },
        select: {
            author: false,
            title: false,
            content: false,
            createdAt: false,
            isPublished: false,
            id: true,
            likes: {
                select: {
                    userId: true
                }
            }
        }
    });
    const post: Awaited<ReturnType<typeof getPost>> = await retryQuery(getPost, 3);
    console.log(currEmail, 'currEmail');
    const currUserId = await prisma.user.findUnique({
        where: {
            email: currEmail as string
        },
        select: {
            id: true
        }
    }).then(rec => rec?.id)
        .catch(err => {
            console.error(`Error: cannot find user with email: ${currEmail}, \nerr: ${err}`);
        });

    if (!currUserId) {
        console.log('404 - user not found');
        return { data: null, info: 'user not found', code: 404 };

    }

    const isAlreadyVoted = post?.likes.findIndex(like => like.userId === currUserId);
    if (isAlreadyVoted) {
        console.log('409 - conflict - user already voted');
        return { data: null, info: 'user already voted', code: 409 };
    }

    const createUpVoteRecord = async () => await prisma.likes.create({
        data: {
            postId: postId as string,
            userId: currUserId
        }
    });

    const upVoteRecord: Awaited<ReturnType<typeof createUpVoteRecord>> = await retryQuery(createUpVoteRecord, 3);
    return { data: upVoteRecord, info: null, code: 200 };
}