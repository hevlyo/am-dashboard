import { JwtRefreshGuard } from "./jwt-refresh.guard";

describe("JwtRefreshGuard", () => {
  it("can be instantiated", () => {
    const guard = new JwtRefreshGuard();

    expect(guard).toBeDefined();
  });
});
