import { Test } from "@nestjs/testing";
import { AppModule } from "./app.module";
import { PrismaService } from "./prisma/prisma.service";

describe("AppModule", () => {
  it("compiles the module", async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue({
        $connect: jest.fn(),
        $disconnect: jest.fn(),
      })
      .compile();

    expect(moduleRef).toBeDefined();

    await moduleRef.close();
  });
});
