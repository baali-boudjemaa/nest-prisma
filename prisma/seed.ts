import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Start seeding...');

    // Seed Experiences
    const experiences = [
        {
            role: 'Senior Full Stack Developer',
            company: 'Tech Innovators',
            duration: '2022 - Present',
            description: 'Leading the development of a next-gen cloud platform using NestJS and Next.js.',
        },
        {
            role: 'Full Stack Developer',
            company: 'Digital Solutions',
            duration: '2020 - 2022',
            description: 'Developed and maintained various web applications for international clients.',
        },
        {
            role: 'Junior Web Developer',
            company: 'StartUp Hub',
            duration: '2018 - 2020',
            description: 'Assisted in the design and implementation of responsive websites and user interfaces.',
        },
    ];

    for (const exp of experiences) {
        await prisma.experience.create({
            data: exp,
        });
    }

    // Seed Projects
    const projects = [
        {
            name: 'Portfolio Website',
            description: 'A personal portfolio website built with Next.js and NestJS.',
            url: 'https://github.com/user/portfolio',
        },
        {
            name: 'E-commerce Platform',
            description: 'A full-scale e-commerce solution with integrated payments.',
            url: 'https://github.com/user/ecommerce',
        },
    ];

    for (const project of projects) {
        await prisma.project.create({
            data: project,
        });
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
