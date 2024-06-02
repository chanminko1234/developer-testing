import { PrismaClient, Status } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const propertyTypes = ['Condos', 'Houses', 'Apartments', 'Villas', 'Townhouses', 'Offices', 'Penthouses'];
const propertyTypeCount = propertyTypes.length;

const generateProperties = async (count: number) => {
    const properties = [];

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * propertyTypeCount);
        const propertyType = propertyTypes[randomIndex];

        const images = Array.from({ length: 5 }, () => ({
            url: faker.image.urlLoremFlickr({ category: propertyType.toLowerCase(), width: 600, height: 600 })
        }));

        const property = {
            project_name: faker.company.name(),
            title: faker.lorem.words(3),
            price: faker.number.int({ min: 10000, max: 1000000 }),
            bedroom_count: faker.number.int({ min: 1, max: 10 }),
            bathroom_count: faker.number.int({ min: 1, max: 10 }),
            area: faker.number.int({ min: 500, max: 5000 }),
            description: faker.lorem.paragraph(2),
            status: faker.helpers.arrayElement([Status.BUY, Status.SALE, Status.RENT]),
            images: {
                create: images,
            },
        };
        properties.push(property);
    }

    for (const property of properties) {
        await prisma.property.create({
            data: property,
        });
    }
};

const main = async (count: number) => {
    console.log('Seeding database...');
    await generateProperties(count);
    console.log('Database seeded!');
};

// Get the count from the command line arguments
const args = process.argv.slice(2);
const count = parseInt(args[0], 10) || 10000; // Default to 10000 if no count is provided

main(count)
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
