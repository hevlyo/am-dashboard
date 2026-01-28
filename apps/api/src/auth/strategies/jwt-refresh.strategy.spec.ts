import { JwtRefreshStrategy } from "./jwt-refresh.strategy";
import { ConfigService } from "@nestjs/config";

describe("JwtRefreshStrategy", () => {
  it("returns user payload on validate", async () => {
    const configService = {
      get: jest.fn().mockReturnValue("secret"),
    } as unknown as ConfigService;
    const strategy = new JwtRefreshStrategy(configService);

    const result = await strategy.validate({} as any, {
      sub: "1",
      email: "user@test.com",
    });

    expect(result).toEqual({ id: "1", email: "user@test.com" });
  });
});
