import { AccountStatus, Role } from "../generated/prisma";
import { prisma } from "../src/configs/prisma-client.config";
import { BcryptUtil } from "../src/utils/Auth/bcrypt.utils";

const SUPER_ADMIN = {
  name: "Super Admin",
  email: "superadmin@popolaundry.com",
  password: "password123",
};

async function main() {
  console.log("🌱 Seeding Super Admin...");

  const passwordHash = await BcryptUtil.hash(SUPER_ADMIN.password);

  const superAdmin = await prisma.employee.upsert({
    where: {
      email: SUPER_ADMIN.email,
    },
    update: {
      role: Role.SUPER_ADMIN,
      name: SUPER_ADMIN.name,
      passwordHash,
      accountStatus: AccountStatus.ACTIVE,
      workStatus: null,
      currentOutletId: null,
      deletedAt: null,
    },
    create: {
      role: Role.SUPER_ADMIN,
      name: SUPER_ADMIN.name,
      email: SUPER_ADMIN.email,
      passwordHash,
      accountStatus: AccountStatus.ACTIVE,
      workStatus: null,
      currentOutletId: null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      accountStatus: true,
    },
  });

  console.log("✅ Super Admin berhasil dibuat:");
  console.log(`   ID       : ${superAdmin.id}`);
  console.log(`   Name     : ${superAdmin.name}`);
  console.log(`   Email    : ${superAdmin.email}`);
  console.log(`   Role     : ${superAdmin.role}`);
  console.log(`   Status   : ${superAdmin.accountStatus}`);
  console.log("");
  console.log("🔑 Login:");
  console.log(`   Email    : ${SUPER_ADMIN.email}`);
  console.log(`   Password : ${SUPER_ADMIN.password}`);
}

main()
  .catch((error) => {
    console.error("❌ Seed Super Admin gagal:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
