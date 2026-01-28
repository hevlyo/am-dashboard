import { JwtStrategy } from "./jwt.strategy";
import { ConfigService } from "@nestjs/config";

describe("JwtStrategy", () => {
  it("returns user payload on validate", async () => {
    const configService = {
      get: jest.fn().mockReturnValue("secret"),
    } as unknown as ConfigService;
    const strategy = new JwtStrategy(configService);

    const result = await strategy.validate({
      sub: "1",
      email: "user@test.com",
    });

    expect(result).toEqual({ id: "1", email: "user@test.com" });
  });
});
