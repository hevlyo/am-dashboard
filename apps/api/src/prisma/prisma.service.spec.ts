import { PrismaService } from "./prisma.service";

describe("PrismaService", () => {
  it("connects on module init", async () => {
    const prisma = new PrismaService();
    const connectSpy = jest
      .spyOn(prisma, "$connect")
      .mockResolvedValue(undefined as never);

    await prisma.onModuleInit();

    expect(connectSpy).toHaveBeenCalledTimes(1);
  });

  it("disconnects on module destroy", async () => {
    const prisma = new PrismaService();
    const disconnectSpy = jest
      .spyOn(prisma, "$disconnect")
      .mockResolvedValue(undefined as never);

    await prisma.onModuleDestroy();

    expect(disconnectSpy).toHaveBeenCalledTimes(1);
  });
});
