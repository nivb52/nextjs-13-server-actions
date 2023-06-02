import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function createPostModels(): Promise<void> {

    const numUsers = parseInt(process.env.NUM_USERS || "1");
    const maxNumPosts = parseInt(process.env.MAX_POSTS || "3");
    try {
        // Fetch existing users from the database
        const users = await prisma.user.findMany({
            take: numUsers
        });

        // Generate and assign posts to each user
        const posts = [];
        for (const user of users) {
            const numPosts = faker.number.int({ max: maxNumPosts, min: 1 })

            // Create the posts
            for (let i = 0; i < numPosts; i++) {
                const post = {
                    title: faker.lorem.words({ min: 3, max: 5 }),
                    slug: faker.lorem.slug({ min: 3, max: 6 }),
                    content: faker.lorem.sentences({ min: 0, max: 2 }) + '<br/>\n' + faker.lorem.paragraphs({ min: 2, max: 6 }, '<br/>\n'),
                    userId: user.id,
                    isPublished: true
                };
                posts.push(post);
            }
        }

        // Bulk create the posts
        await prisma.post.createMany({
            data: posts,
            skipDuplicates: true,
        });

        console.log(`${posts.length} Post created successfully! (for ${users.length} users)`);
    } catch (error) {
        console.error("Error seeding posts models:\n", error);
    } finally {
        await prisma.$disconnect();
    }
}

createPostModels();