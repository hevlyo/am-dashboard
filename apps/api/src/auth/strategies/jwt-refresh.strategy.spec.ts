import { JwtRefreshStrategy } from "./jwt-refresh.strategy";
import { ConfigService } from "@nestjs/config";
import type { Request } from "express";

describe("JwtRefreshStrategy", () => {
  it("returns user payload on validate", async () => {
    const configService = {
      get: jest.fn().mockReturnValue("secret"),
    } as unknown as ConfigService;
    const strategy = new JwtRefreshStrategy(configService);

    const result = await strategy.validate({} as Request, {
      sub: "1",
      email: "user@test.com",
    });

    expect(result).toEqual({ id: "1", email: "user@test.com" });
  });
});
