import { PrismaClient, TalentStatus, InteractionType, InteractionStatus } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Create TechnicalLeads
  const alice = await prisma.technicalLead.create({
    data: {
      fullName: 'Alice Johnson',
    },
  });

  const bob = await prisma.technicalLead.create({
    data: {
      fullName: 'Bob Williams',
    },
  });

  // Create Talents
  const john = await prisma.talent.create({
    data: {
      fullName: 'John Doe',
      seniority: 'Senior',
      role: 'Backend Developer',
      status: TalentStatus.ACTIVE,
      leader: { connect: { id: alice.id } },
      mentor: { connect: { id: bob.id } },
    },
  });

  const jane = await prisma.talent.create({
    data: {
      fullName: 'Jane Smith',
      seniority: 'Mid',
      role: 'Frontend Developer',
      status: TalentStatus.INACTIVE,
      leader: { connect: { id: bob.id } },
      mentor: { connect: { id: alice.id } },
    },
  });

  // Create Interactions
  await prisma.interaction.createMany({
    data: [
      {
        type: InteractionType.CALL,
        date: new Date('2024-08-01T10:00:00Z'),
        details: 'Kickoff call with John',
        status: InteractionStatus.COMPLETED,
        modifiedAt: new Date(),
        talentId: john.id,
        createdAt: new Date(),
      },
      {
        type: InteractionType.FEEDBACK,
        date: new Date('2024-08-10T15:00:00Z'),
        details: 'Jane received positive feedback from her mentor.',
        status: InteractionStatus.PENDING,
        modifiedAt: new Date(),
        talentId: jane.id,
        createdAt: new Date(),
      },
    ],
  });

  console.log('Seed executed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });