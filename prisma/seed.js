const { PrismaClient, Prisma } = require("@prisma/client");
const data = require("./mock-data.json");
const fs = require("fs");
const prisma = new PrismaClient();

async function main() {
  const clerkId = process.env.ADMIN_USER_ID;
  const jobs = data.map((job) => {
    return {
      ...job,
      clerkId,
    };
  });
  const createJobs = await prisma.job.createMany({
    data: [...jobs],
    skipDuplicates: true,
  });
  const allJobs = await prisma.job.findMany();
  console.log(typeof allJobs);
  let newData = { data: [] };
  allJobs.forEach((val) => {
    //let obj = JSON.parse(val);
    //console.log(obj);
    //let json = JSON.stringify(obj);
    newData.data.push(val);
  });
  let json = JSON.stringify(newData);
  fs.writeFile("data.json", json, (error) => {
    if (error) {
      console.log("An error has occurred ", error);
      return;
    }
    console.log("Data written successfully to disk");
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

//node seed.js
