import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function createUserModels(): Promise<void> {
    const numModels = parseInt(process.env.NUM_MODELS || "1");

    try {
        for (let i = 0; i < numModels; i++) {

            const data = {
                name: faker.person.fullName(),
                bio: faker.lorem.sentence(),
                age: faker.number.int({ min: 18, max: 60 }),
                email: faker.internet.email(),
                emailVerified: new Date(),
                image: faker.image.avatarGitHub(),
            };

            await prisma.user.create({ data });
        }

        console.log(`${numModels} user models created successfully!`);
    } catch (error) {
        console.error("Error creating user models:", error);
    } finally {
        await prisma.$disconnect();
    }
}

createUserModels();