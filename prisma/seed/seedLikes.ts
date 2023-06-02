import { Prisma, PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
interface PostWithLikes {
    id: string,
    authorId: string
    likeUserIds: string[]
}

async function createPostModels(): Promise<void> {

    const maxNumLikes = parseInt(process.env.MAX_LIKES || "6");
    const numPosts = parseInt(process.env.NUM_POSTS || "3");
    try {
        // Fetch existing users from the database
        const posts = await prisma.post.findMany({
            take: numPosts,
            select: {
                id: true,
                likes: {
                    select: {
                        userId: true
                    }
                },
                userId: true
            }
        }).then(recs => {
            return recs.map(rec => ({
                id: rec.id,
                authorId: rec.userId,
                likeUserIds: rec.likes.map(like => like.userId)
            }));
        });

        const userIds = await prisma.user.findMany({
            take: maxNumLikes,
            select: {
                id: true
            }
        }).then(recs => {
            return recs.map(rec => rec.id)
        });

        if (!posts.length || !userIds.length) {
            throw new Error('No Post or Users found');
        }

        const maxLikes = userIds.length;
        // Generate and assign posts to each user
        const getUsers = (n: number, post: PostWithLikes) => {
            const userIdsNotFiltered = faker.helpers.arrayElements(userIds, n + 1);
            return userIdsNotFiltered.filter(userId => {
                return !post.likeUserIds.includes(userId) && userId !== post.authorId
            });
        };

        const likes = [];
        for (const post of posts) {
            const numLikes = faker.number.int({ max: maxLikes, min: 1 })
            const usersForLike = getUsers(numLikes, post);
            // Create the likes
            for (let i = 0; i < usersForLike.length; i++) {
                if (usersForLike[i]) {
                    const like = {
                        postId: post.id,
                        userId: usersForLike[i],
                    };
                    likes.push(like);
                }
            }
        }
        let likesCounter = 0, errorsCounter = 0;
        try {
            // Bulk create the posts
            await prisma.likes.createMany({
                data: likes,
                skipDuplicates: true
            });
            likesCounter = likes.length;
        } catch (err) {
            console.error("Error creating Likes models:\n", err);
            for (const like of likes) {

                const posetIdUserId: Prisma.LikesUserIdPostIdCompoundUniqueInput = {
                    postId: like.postId,
                    userId: like.userId
                }

                try {
                    await prisma.likes.upsert({
                        update: posetIdUserId,
                        create: posetIdUserId,
                        where: {
                            userId_postId: posetIdUserId
                        }
                    });
                    likesCounter++
                } catch (err) {
                    errorsCounter++
                }
            }
        }
        console.log(`${likesCounter} Likes created successfully! (for ${posts.length} posts)`);
        console.log(`${errorsCounter} Likes Failed to be created`);

    } catch (err) {
        console.error("==== Error seeding Likes models:\n", err);
    } finally {
        await prisma.$disconnect();
    }
}

createPostModels();