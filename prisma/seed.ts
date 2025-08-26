import { PrismaClient, TalentStatus, InteractionType, InteractionStatus } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Create TechnicalLeads
  const alice =
  (await prisma.technicalLead.findFirst({ where: { fullName: 'Alice Johnson' } })) ??
  (await prisma.technicalLead.create({ data: { fullName: 'Alice Johnson' } }));

const bob =
  (await prisma.technicalLead.findFirst({ where: { fullName: 'Bob Williams' } })) ??
  (await prisma.technicalLead.create({ data: { fullName: 'Bob Williams' } }));

  // Create Talents
  const john = await prisma.talent.create({
    data: {
      fullName: 'John Doe',
      seniority: 'SENIOR',
      role: 'Backend Developer',
      status: TalentStatus.ACTIVE,
      leader: { connect: { id: alice.id } },
      mentor: { connect: { id: bob.id } },
    },
  });

  const jane = await prisma.talent.create({
    data: {
      fullName: 'Jane Smith',
      seniority: 'SEMI_SENIOR',
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

  // Bulk-create additional talents (>=150) with random status and seniority
  const firstNames = [
    'Liam','Olivia','Noah','Emma','Oliver','Ava','Elijah','Sophia','William','Isabella',
    'James','Mia','Benjamin','Charlotte','Lucas','Amelia','Henry','Harper','Alexander','Evelyn',
    'Michael','Abigail','Ethan','Emily','Daniel','Elizabeth','Jacob','Mila','Logan','Luna',
    'Jackson','Avery','Levi','Sofia','Sebastian','Camila','Mateo','Aria','Jack','Scarlett',
    'Owen','Penelope','Theodore','Layla','Aiden','Chloe','Samuel','Victoria','Joseph','Madison',
    'John','Eleanor','David','Grace','Wyatt','Nora','Matthew','Riley','Luke','Zoey'
  ];
  const lastNames = [
    'Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez',
    'Hernandez','Lopez','Gonzalez','Wilson','Anderson','Thomas','Taylor','Moore','Jackson','Martin',
  ];
  const roles = [
    'Backend Developer','Frontend Developer','Fullstack Developer','Mobile Developer','Data Engineer',
    'Data Scientist','DevOps Engineer','QA Engineer','Product Manager','UI/UX Designer',
    'Cloud Engineer','Site Reliability Engineer','ML Engineer','Security Engineer','Scrum Master'
  ];
  const statuses = [TalentStatus.ACTIVE, TalentStatus.INACTIVE];
  const seniorities = ['SENIOR', 'SEMI_SENIOR', 'JUNIOR'] as const;

  const namePool: string[] = [];
  for (let i = 0; i < firstNames.length; i++) {
    for (let j = 0; j < lastNames.length; j++) {
      namePool.push(`${firstNames[i]} ${lastNames[j]}`);
    }
  }

  const targetCount = 150;
  const talentsToCreate = namePool.slice(0, targetCount).map((fullName, idx) => ({
    fullName,
    role: roles[Math.floor(Math.random() * roles.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    seniority: seniorities[Math.floor(Math.random() * seniorities.length)],
    leaderId: idx % 2 === 0 ? alice.id : bob.id,
    mentorId: idx % 2 === 0 ? bob.id : alice.id,
  }));

  // Use individual create to support relation connects
  for (const t of talentsToCreate) {
    await prisma.talent.create({
      data: {
        fullName: t.fullName,
        role: t.role,
        status: t.status,
        seniority: t.seniority,
        leader: { connect: { id: t.leaderId } },
        mentor: { connect: { id: t.mentorId } },
      },
    });
  }

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